import os
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.models.user import User
from app.security.auth import get_current_user

from app.services.resume_service import (
    extract_text_from_pdf,
    parse_resume,
    calculate_ats_score
)

from app.services.placement_service import (
    calculate_placement_readiness
)

from app.services.company_service import (
    calculate_company_matches
)

from app.services.gemini_service import (
    improve_resume,
    generate_career_roadmap
)

from ml.predict import predict_resume

router = APIRouter()


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Allow only PDF
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Save uploaded file
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join("uploads", unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Parse Resume
    parsed_resume = parse_resume(extracted_text)

    # Rule Based ATS
    ats_score = calculate_ats_score(parsed_resume)

    # ML ATS
    try:
        ml_score = predict_resume(parsed_resume)
    except Exception as e:
        print("ML Prediction Error:", e)
        ml_score = ats_score["overall"]

    ats_score["ml_score"] = ml_score

    # Placement Readiness
    placement = calculate_placement_readiness(
        parsed_resume,
        ats_score
    )

    # Company Matching
    company_matches = calculate_company_matches(
        parsed_resume
    )

    # Gemini Resume Analysis
    resume_analysis = improve_resume(
        extracted_text
    )

    # Career Roadmap
    if len(company_matches) > 0:
        top_company = company_matches[0]

        roadmap_input = type(
            "RoadmapData",
            (),
            {
                "target_company": top_company["company"],
                "ats_score": ml_score,
                "placement_probability": placement["placement_score"],
                "matched_skills": top_company["matched_skills"],
                "missing_skills": top_company["missing_skills"]
            }
        )

        career_roadmap = generate_career_roadmap(
            roadmap_input
        )
    else:
        career_roadmap = "No roadmap could be generated."

    # Save Resume
    resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        resume_text=extracted_text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": str(resume.id),
        "parsed_resume": parsed_resume,
        "ats_score": ats_score,
        "placement": placement,
        "company_matches": company_matches,
        "resume_analysis": resume_analysis,
        "career_roadmap": career_roadmap
    }
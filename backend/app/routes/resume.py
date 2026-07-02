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

router = APIRouter()


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Allow only PDF files
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join("uploads", unique_filename)

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Parse resume
    parsed_resume = parse_resume(extracted_text)

    # Calculate ATS score
    ats_score = calculate_ats_score(parsed_resume)

    # Save resume in database
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
        "ats_score": ats_score
    }
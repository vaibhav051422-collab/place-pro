from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.models.user import User
from app.schemas.job import JobDescription
from app.security.auth import get_current_user
from app.services.resume_service import parse_resume
from app.services.job_service import (
    extract_job_skills,
    calculate_job_match
)

router = APIRouter()


@router.post("/match")
def job_match(
    job: JobDescription,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {
            "message": "Resume not found."
        }

    parsed_resume = parse_resume(resume.resume_text)

    resume_skills = parsed_resume["skills"]

    job_skills = extract_job_skills(job.description)

    return calculate_job_match(
        resume_skills,
        job_skills
    )
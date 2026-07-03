from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.models.user import User
from app.security.auth import get_current_user

from app.services.resume_service import (
    parse_resume,
    calculate_ats_score
)

from app.services.placement_service import (
    calculate_placement_readiness
)

router = APIRouter()


@router.get("/readiness")
def placement_readiness(
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

    ats_score = calculate_ats_score(parsed_resume)

    result = calculate_placement_readiness(
        parsed_resume,
        ats_score
    )

    return result
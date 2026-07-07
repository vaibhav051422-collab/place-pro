from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.security.auth import get_current_user
from app.models.user import User
from app.models.resume import Resume

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(
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
        "resume_uploaded": False,
        "user": {
            "name": current_user.name,
            "email": current_user.email
        }
    }
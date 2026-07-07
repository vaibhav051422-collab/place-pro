from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.improve import ResumeImproveRequest
from app.security.auth import get_current_user
from app.models.user import User
from app.services.gemini_service import improve_resume

router = APIRouter()


@router.post("/improve")
def improve_resume_api(
    request: ResumeImproveRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = improve_resume(request.resume_text)

    return result
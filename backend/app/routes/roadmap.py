from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.security.auth import get_current_user
from app.models.user import User
from app.services.gemini_service import generate_career_roadmap
from app.schemas.roadmap import RoadmapRequest

router = APIRouter()


@router.post("/")
def roadmap(
    request: RoadmapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return generate_career_roadmap(request)
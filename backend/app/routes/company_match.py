from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.security.auth import get_current_user
from app.schemas.company_match import CompanyMatchRequest
from app.services.company_match_service import analyze_company_match
from app.services.gemini_service import company_recommendation

router = APIRouter()


@router.post("/company-match")
def company_match(
    request: CompanyMatchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    result = analyze_company_match(
        request.company,
        request.resume_skills
    )

    if "error" in result:
        return result

    result["ai_recommendation"] = company_recommendation(
        request.company,
        result["matched_skills"],
        result["missing_skills"]
    )

    return result
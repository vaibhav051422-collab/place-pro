from fastapi import APIRouter
from pydantic import BaseModel

from ml.predict import predict_resume

router = APIRouter()


class ResumeFeatures(BaseModel):
    skills: list[str]
    experience: int
    education: str
    projects: int
    salary: int = 50000
    certification: str = "None"
    job_role: str = "Software Engineer"


@router.post("/predict")
def predict(features: ResumeFeatures):

    score = predict_resume(features.dict())

    return {
        "ats_score": score
    }
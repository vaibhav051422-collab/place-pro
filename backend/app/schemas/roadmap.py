from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    target_company: str
    ats_score: float
    placement_probability: float
    matched_skills: list[str]
    missing_skills: list[str]
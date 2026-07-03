from pydantic import BaseModel


class PlacementResponse(BaseModel):
    placement_score: int
    strengths: list[str]
    weaknesses: list[str]
    recommendations: list[str]
from pydantic import BaseModel


class CompanyMatchRequest(BaseModel):
    company: str
    resume_skills: list[str]
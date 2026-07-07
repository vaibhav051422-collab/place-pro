from pydantic import BaseModel


class ResumeImproveRequest(BaseModel):
    resume_text: str
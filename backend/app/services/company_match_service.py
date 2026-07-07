import json
import os


DATA_FOLDER = os.path.join(
    os.path.dirname(__file__),
    "..",
    "data"
)


def analyze_company_match(company: str, resume_skills: list):

    file_path = os.path.join(
        DATA_FOLDER,
        f"{company.lower()}.json"
    )

    if not os.path.exists(file_path):
        return {
            "error": "Company not found"
        }

    with open(file_path, "r") as f:
        company_data = json.load(f)

    required_skills = company_data["required_skills"]

    matched = []
    missing = []

    resume_lower = [skill.lower() for skill in resume_skills]

    for skill in required_skills:

        if skill.lower() in resume_lower:
            matched.append(skill)
        else:
            missing.append(skill)

    score = round(
        (len(matched) / len(required_skills)) * 100
    )

    if score >= 80:
        level = "Excellent"

    elif score >= 60:
        level = "High"

    elif score >= 40:
        level = "Medium"

    else:
        level = "Low"

    return {
        "company": company,
        "compatibility_score": score,
        "compatibility_level": level,
        "matched_skills": matched,
        "missing_skills": missing
    }
import re


SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "REST API",
    "HTML",
    "CSS"
]


def extract_job_skills(description: str):
    found = []

    for skill in SKILLS:
        if re.search(rf"\b{re.escape(skill)}\b", description, re.IGNORECASE):
            found.append(skill)

    return found


def calculate_job_match(resume_skills, job_skills):

    matched = []

    missing = []

    for skill in job_skills:
        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    if len(job_skills) == 0:
        score = 0
    else:
        score = round((len(matched) / len(job_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
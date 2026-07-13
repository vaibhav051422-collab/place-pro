import re

SKILLS = [
    "Python",
    "Java",
    "C++",
    "C",
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
    "CSS",
    "Linux",
    "Spring Boot",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Azure",
    ".NET"
]


def extract_job_skills(description: str):
    description = description.lower()

    found = []

    for skill in SKILLS:
        if skill.lower() in description:
            found.append(skill)

    return list(set(found))


def calculate_job_match(resume_skills, job_skills):

    resume = {s.lower() for s in resume_skills}
    job = {s.lower() for s in job_skills}

    matched = []
    missing = []

    for skill in job_skills:
        if skill.lower() in resume:
            matched.append(skill)
        else:
            missing.append(skill)

    score = 0

    if len(job_skills) > 0:
        score = round((len(matched) / len(job_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
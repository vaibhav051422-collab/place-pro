import fitz
import re


def extract_text_from_pdf(pdf_path: str):
    text = ""

    pdf = fitz.open(pdf_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text


def parse_resume(text: str):
    data = {}

    # ---------------- Name ----------------

    lines = [line.strip() for line in text.split("\n") if line.strip()]
    data["name"] = lines[0] if lines else ""

    # ---------------- Email ----------------

    email = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    data["email"] = email.group(0) if email else ""

    # ---------------- Phone ----------------

    phone = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        text
    )

    data["phone"] = phone.group(0) if phone else ""

    # ---------------- Skills ----------------

    skill_list = [
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
        "TensorFlow",
        "Git",
        "GitHub",
        "HTML",
        "CSS",
        "REST API"
    ]

    found_skills = []

    for skill in skill_list:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    data["skills"] = found_skills

    # ---------------- Education ----------------

    education_keywords = [
        "B.Tech",
        "Bachelor",
        "Computer Science",
        "Graphic Era",
        "University",
        "College"
    ]

    education = []

    for line in lines:
        for keyword in education_keywords:
            if keyword.lower() in line.lower():
                education.append(line)
                break

    data["education"] = list(dict.fromkeys(education))

    # ---------------- Projects ----------------

    project_names = [
        "NovaPass",
        "FriendBook",
        "NewsScope"
    ]

    projects = []

    for project in project_names:
        if project.lower() in text.lower():
            projects.append(project)

    data["projects"] = projects

    # ---------------- Experience ----------------

    experience_keywords = [
        "Intern",
        "Internship",
        "Experience",
        "Software Engineer",
        "Developer"
    ]

    experience = []

    for line in lines:
        for keyword in experience_keywords:
            if keyword.lower() in line.lower():
                experience.append(line)
                break

    data["experience"] = experience

    return data


# ==========================================================
# ATS SCORE ENGINE
# ==========================================================

def calculate_ats_score(parsed_resume):
    score = {
        "contact": 0,
        "skills": 0,
        "education": 0,
        "projects": 0,
        "experience": 0,
        "overall": 0,
        "suggestions": []
    }

    # ---------------- Contact (15 Marks) ----------------

    if parsed_resume.get("name"):
        score["contact"] += 5

    if parsed_resume.get("email"):
        score["contact"] += 5

    if parsed_resume.get("phone"):
        score["contact"] += 5

    # ---------------- Skills (30 Marks) ----------------

    skill_count = len(parsed_resume.get("skills", []))

    if skill_count >= 15:
        score["skills"] = 30
    elif skill_count >= 10:
        score["skills"] = 25
    elif skill_count >= 5:
        score["skills"] = 15
    else:
        score["skills"] = 5
        score["suggestions"].append(
            "Add more relevant technical skills."
        )

    # ---------------- Education (20 Marks) ----------------

    if len(parsed_resume.get("education", [])) > 0:
        score["education"] = 20
    else:
        score["education"] = 0
        score["suggestions"].append(
            "Add your education details."
        )

    # ---------------- Projects (25 Marks) ----------------

    project_count = len(parsed_resume.get("projects", []))

    if project_count >= 3:
        score["projects"] = 25
    elif project_count == 2:
        score["projects"] = 20
    elif project_count == 1:
        score["projects"] = 10
    else:
        score["projects"] = 0
        score["suggestions"].append(
            "Include technical projects."
        )

    # ---------------- Experience (10 Marks) ----------------

    if len(parsed_resume.get("experience", [])) > 0:
        score["experience"] = 10
    else:
        score["experience"] = 0
        score["suggestions"].append(
            "Gain internship or work experience."
        )

    # ---------------- Overall ----------------

    score["overall"] = (
        score["contact"] +
        score["skills"] +
        score["education"] +
        score["projects"] +
        score["experience"]
    )

    return score
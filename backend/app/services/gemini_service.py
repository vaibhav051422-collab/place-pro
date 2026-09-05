import os
import json
import re
import traceback

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def normalize_resume_analysis(data: dict, resume_text: str, parsed_resume=None):

    text = resume_text.lower()
    parsed_resume = parsed_resume or {}

    strengths = list(data.get("strengths") or [])
    weaknesses = [
        item for item in list(data.get("weaknesses") or [])
        if item and item.strip().lower() != "unable to analyze resume."
    ]
    recommended_skills = list(data.get("recommended_skills") or [])

    skills = [skill.lower() for skill in parsed_resume.get("skills", [])]
    projects = parsed_resume.get("projects", []) or []
    experience = parsed_resume.get("experience", []) or []
    education = parsed_resume.get("education", []) or []
    name = parsed_resume.get("name", "")
    email = parsed_resume.get("email", "")
    phone = parsed_resume.get("phone", "")

    if not strengths:
        if any(keyword in skills for keyword in ["python", "java", "react", "sql", "aws"]):
            strengths.append("Shows relevant technical skills for placement roles.")

        if projects:
            strengths.append("Includes project work that can be discussed in interviews.")

        if experience:
            strengths.append("Mentions practical experience or internship exposure.")

        if education:
            strengths.append("Has an academic background aligned with career readiness.")

        if name and email and phone:
            strengths.append("Contact details are complete and easy to verify.")

    if not weaknesses:
        if len(skills) < 4:
            weaknesses.append("Add more in-demand technical skills to improve ATS compatibility.")

        if len(projects) < 2:
            weaknesses.append("Add 2-3 strong projects to demonstrate practical skills.")

        if not experience:
            weaknesses.append("Include internship or work experience to strengthen credibility.")

        if not education:
            weaknesses.append("Add education details so recruiters can quickly understand your background.")

        if not email or not phone:
            weaknesses.append("Make contact details easy to find at the top of the resume.")

        if not any(char.isdigit() for char in text):
            weaknesses.append("Add measurable outcomes or numbers to show impact.")

        if len(text.split()) < 120:
            weaknesses.append("Expand the resume with more detail about projects and achievements.")

    if not recommended_skills:
        if "python" not in skills:
            recommended_skills.append("Python")
        if "sql" not in skills:
            recommended_skills.append("SQL")
        if "react" not in skills:
            recommended_skills.append("React")
        if "aws" not in skills:
            recommended_skills.append("AWS")

    summary = data.get("suggested_summary") or ""
    if not summary:
        summary = (
            "Resume shows potential, but the AI analysis needs a clearer profile summary. "
            "Strengthen projects, skills, and measurable outcomes."
        )

    return {
        "strengths": strengths[:5],
        "weaknesses": weaknesses[:5],
        "suggested_summary": summary,
        "recommended_skills": recommended_skills[:8],
        "predicted_ats_score": data.get("predicted_ats_score", 0)
    }

# =====================================================
# Resume Improvement
# =====================================================

def improve_resume(resume_text: str, parsed_resume=None):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Return ONLY valid JSON.

{{
    "strengths": [],
    "weaknesses": [],
    "suggested_summary": "",
    "recommended_skills": [],
    "predicted_ats_score": 0
}}

Resume:

{resume_text}
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        print("\n========== GEMINI RESUME RESPONSE ==========")
        print(response.text)
        print("============================================\n")

        text = response.text.strip()
        text = text.replace("```json", "")
        text = text.replace("```", "")

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            text = match.group()

        return normalize_resume_analysis(
            json.loads(text),
            resume_text,
            parsed_resume
        )

    except Exception:

        print("\n========== GEMINI RESUME ERROR ==========")
        traceback.print_exc()
        print("=========================================\n")

        return normalize_resume_analysis({
            "strengths": [],
            "weaknesses": [],
            "suggested_summary": "",
            "recommended_skills": [],
            "predicted_ats_score": 0
        }, resume_text, parsed_resume)


# =====================================================
# Company Recommendation
# =====================================================

def company_recommendation(
    company: str,
    matched: list,
    missing: list
):

    prompt = f"""
You are an expert Career Coach.

Company:
{company}

Matched Skills:
{matched}

Missing Skills:
{missing}

Return ONLY a professional recommendation.

Maximum 120 words.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip()

    except Exception:

        traceback.print_exc()

        return (
            "Your profile has good potential. Focus on the missing skills "
            "and strengthen your projects."
        )


# =====================================================
# Roadmap Helpers
# =====================================================

def normalize_career_roadmap(data: dict):

    weeks = {
        "week1": list(data.get("week1") or []),
        "week2": list(data.get("week2") or []),
        "week3": list(data.get("week3") or []),
        "week4": list(data.get("week4") or [])
    }

    target_company = data.get("target_company", "Target Company")
    matched_skills = list(data.get("matched_skills") or [])
    missing_skills = list(data.get("missing_skills") or [])
    ats_score = data.get("ats_score", 0)
    placement_probability = data.get("placement_probability", 0)

    if not weeks["week1"]:
        weeks["week1"] = [
            "Audit your resume and map it to the role requirements.",
            "Update your LinkedIn and project descriptions.",
            f"Review the profile for {target_company} and list priority skills."
        ]

    if not weeks["week2"]:
        weeks["week2"] = [
            f"Build or improve 1 project using {matched_skills[0] if matched_skills else 'Python'}.",
            "Practice core interview questions and resume walkthroughs.",
            "Add measurable outcomes to project bullets."
        ]

    if not weeks["week3"]:
        weeks["week3"] = [
            f"Close skill gaps in {', '.join(missing_skills[:3]) if missing_skills else 'DSA and communication'}.",
            "Solve daily coding problems and revise fundamentals.",
            "Prepare 2-minute answers for common placement questions."
        ]

    if not weeks["week4"]:
        weeks["week4"] = [
            f"Run mock interviews aligned with {target_company} roles.",
            "Finalize resume, portfolio, and project links.",
            f"Track ATS {ats_score} and placement readiness {placement_probability}% before applying."
        ]

    summary = data.get("summary") or (
        f"A focused 4-week roadmap for {target_company} built around your current strengths, gaps, and placement readiness."
    )

    return {
        "summary": summary,
        "week1": weeks["week1"][:5],
        "week2": weeks["week2"][:5],
        "week3": weeks["week3"][:5],
        "week4": weeks["week4"][:5]
    }


# =====================================================
# Career Roadmap
# =====================================================

def generate_career_roadmap(data):

    target_company = getattr(data, "target_company", "Target Company")
    ats_score = getattr(data, "ats_score", 0)
    placement_probability = getattr(data, "placement_probability", 0)
    matched_skills = getattr(data, "matched_skills", []) or []
    missing_skills = getattr(data, "missing_skills", []) or []

    prompt = f"""
You are an expert Career Mentor.

Create a personalized 4-week roadmap.

Target Company:
{target_company}

ATS Score:
{ats_score}

Placement Probability:
{placement_probability}

Matched Skills:
{", ".join(matched_skills)}

Missing Skills:
{", ".join(missing_skills)}

Return ONLY valid JSON.

Format:

{{
    "summary":"",
    "week1":[],
    "week2":[],
    "week3":[],
    "week4":[]
}}
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        print("\n========== GEMINI ROADMAP RESPONSE ==========")
        print(response.text)
        print("=============================================\n")

        text = response.text.strip()
        text = text.replace("```json", "")
        text = text.replace("```", "")

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            text = match.group()

        return normalize_career_roadmap(
            json.loads(text) | {
                "target_company": target_company,
                "ats_score": ats_score,
                "placement_probability": placement_probability,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills
            }
        )

    except Exception:

        print("\n========== GEMINI ROADMAP ERROR ==========")
        traceback.print_exc()
        print("==========================================\n")

        return normalize_career_roadmap({
            "summary": "Unable to generate roadmap from Gemini, using a guided fallback plan.",
            "week1": [],
            "week2": [],
            "week3": [],
            "week4": [],
            "target_company": target_company,
            "ats_score": ats_score,
            "placement_probability": placement_probability,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        })
import os
import json
import re

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# =====================================================
# Resume Improvement
# =====================================================

def improve_resume(resume_text: str):

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

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            text = match.group()

        return json.loads(text)

    except Exception as e:

        print(e)

        return {
            "strengths": [],
            "weaknesses": [
                "Unable to analyze resume."
            ],
            "suggested_summary": "",
            "recommended_skills": [],
            "predicted_ats_score": 0
        }


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

        return (
            "Your profile has good potential. Focus on the missing skills "
            "and strengthen your projects."
        )


# =====================================================
# Career Roadmap
# =====================================================

def generate_career_roadmap(data):

    prompt = f"""
You are an expert Career Mentor.

Create a personalized 4-week roadmap.

Target Company:
{data.target_company}

ATS Score:
{data.ats_score}

Placement Probability:
{data.placement_probability}

Matched Skills:
{", ".join(data.matched_skills)}

Missing Skills:
{", ".join(data.missing_skills)}

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

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            text = match.group()

        return json.loads(text)

    except Exception as e:

        print(e)

        return {
            "summary": "Unable to generate roadmap.",
            "week1": [],
            "week2": [],
            "week3": [],
            "week4": []
        }
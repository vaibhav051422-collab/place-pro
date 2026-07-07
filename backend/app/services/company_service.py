COMPANIES = {
    "Amazon": [
        "Python",
        "Java",
        "AWS",
        "Docker",
        "Kubernetes",
        "System Design",
        "Data Structures",
        "Algorithms",
        "Git",
        "SQL"
    ],
    "Google": [
        "Python",
        "C++",
        "Algorithms",
        "Data Structures",
        "System Design",
        "Linux",
        "Git",
        "SQL",
        "Machine Learning"
    ],
    "Microsoft": [
        "C#",
        ".NET",
        "Azure",
        "React",
        "JavaScript",
        "Git",
        "SQL",
        "Python"
    ],
    "Oracle": [
        "Java",
        "Spring Boot",
        "REST API",
        "SQL",
        "Git",
        "Linux"
    ],
    "Adobe": [
        "Java",
        "Python",
        "React",
        "JavaScript",
        "Algorithms",
        "Data Structures",
        "Git",
        "SQL"
    ]
}


def calculate_company_matches(parsed_resume):

    resume_skills = {
        skill.strip().lower()
        for skill in parsed_resume.get("skills", [])
    }

    matches = []

    for company, required_skills in COMPANIES.items():

        matched = [
            skill
            for skill in required_skills
            if skill.lower() in resume_skills
        ]

        missing = [
            skill
            for skill in required_skills
            if skill.lower() not in resume_skills
        ]

        score = round(
            (len(matched) / len(required_skills)) * 100
        )

        if score >= 80:
            level = "Excellent"
        elif score >= 60:
            level = "Good"
        elif score >= 40:
            level = "Medium"
        else:
            level = "Low"

        matches.append({

            "company": company,

            "compatibility_score": score,

            "compatibility_level": level,

            "matched_skills": matched,

            "missing_skills": missing

        })

    matches.sort(
        key=lambda x: x["compatibility_score"],
        reverse=True
    )

    return matches
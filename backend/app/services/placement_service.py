def calculate_placement_readiness(parsed_resume, ats_score):

    score = 0

    strengths = []

    weaknesses = []

    recommendations = []

    # Resume Quality (30)

    score += ats_score["overall"] * 0.30

    # Skills (25)

    skill_count = len(parsed_resume["skills"])

    if skill_count >= 10:
        score += 25
        strengths.append("Strong Technical Skill Set")
    else:
        score += skill_count * 2
        weaknesses.append("Limited Technical Skills")
        recommendations.append(
            "Learn more in-demand technologies."
        )

    # Projects (20)

    project_count = len(parsed_resume["projects"])

    if project_count >= 3:
        score += 20
        strengths.append("Good Project Portfolio")
    else:
        score += project_count * 6
        weaknesses.append("Need More Projects")
        recommendations.append(
            "Build at least 3 strong projects."
        )

    # Education (15)

    if parsed_resume["education"]:
        score += 15
        strengths.append("Educational Background Available")
    else:
        weaknesses.append("Education Missing")

    # Experience (10)

    if parsed_resume["experience"]:
        score += 10
        strengths.append("Industry Experience")
    else:
        weaknesses.append("No Internship Experience")
        recommendations.append(
            "Apply for internships."
        )

    score = round(min(score,100))

    return {

        "placement_score": score,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "recommendations": recommendations

    }
from predict import predict_resume

parsed_resume = {
    "skills": [
        "Python",
        "AWS",
        "SQL",
        "Git",
        "React"
    ],
    "experience": 2,
    "education": "B.Tech",
    "projects": 4,
    "salary": 70000,
    "certification": "AWS Certified",
    "job_role": "Software Engineer"
}

score = predict_resume(parsed_resume)

print("\n==============================")
print("Predicted ATS Score")
print("==============================")
print(score)
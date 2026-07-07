import json
import joblib
import pandas as pd

education_encoder = joblib.load("ml/models/education_encoder.pkl")
role_encoder = joblib.load("ml/models/role_encoder.pkl")
cert_encoder = joblib.load("ml/models/certification_encoder.pkl")
skill_binarizer = joblib.load("ml/models/skill_binarizer.pkl")

with open("ml/models/feature_columns.json", "r") as f:
    feature_columns = json.load(f)


def create_feature_vector(parsed_resume):

    features = {col: 0 for col in feature_columns}

    features["Experience (Years)"] = parsed_resume.get(
        "experience", 0
    )

    features["Projects Count"] = parsed_resume.get(
        "projects", 0
    )

    features["Salary Expectation ($)"] = parsed_resume.get(
        "salary", 50000
    )

    try:
        features["Education"] = education_encoder.transform(
            [parsed_resume.get("education", "B.Tech")]
        )[0]
    except:
        features["Education"] = 0

    try:
        features["Job Role"] = role_encoder.transform(
            [parsed_resume.get("job_role", "Software Engineer")]
        )[0]
    except:
        features["Job Role"] = 0

    try:
        features["Certifications"] = cert_encoder.transform(
            [parsed_resume.get("certification", "None")]
        )[0]
    except:
        features["Certifications"] = 0

    skills = parsed_resume.get("skills", [])

    features["Skill Count"] = len(skills)

    encoded = skill_binarizer.transform([skills])[0]

    for skill, value in zip(skill_binarizer.classes_, encoded):
        if skill in features:
            features[skill] = value

    return pd.DataFrame([features])
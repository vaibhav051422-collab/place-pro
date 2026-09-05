from pathlib import Path

import os
import joblib
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MultiLabelBinarizer

from ml.dataset_loader import load_dataset


MODELS_DIR = Path(__file__).resolve().parent / "models"


def load_and_preprocess(save_encoders=True):

    df = load_dataset()

    # Fill missing values
    df["Certifications"] = df["Certifications"].fillna("None")

    # -------- Feature Engineering --------

    df["Skills"] = df["Skills"].apply(
        lambda x: [skill.strip() for skill in x.split(",")]
    )

    # New Feature
    df["Skill Count"] = df["Skills"].apply(len)

    # -------- MultiLabel Encoding --------

    mlb = MultiLabelBinarizer()

    skills_encoded = pd.DataFrame(
        mlb.fit_transform(df["Skills"]),
        columns=mlb.classes_
    )

    # -------- Label Encoders --------

    education_encoder = LabelEncoder()
    role_encoder = LabelEncoder()
    cert_encoder = LabelEncoder()
    decision_encoder = LabelEncoder()

    df["Education"] = education_encoder.fit_transform(df["Education"])
    df["Job Role"] = role_encoder.fit_transform(df["Job Role"])
    df["Certifications"] = cert_encoder.fit_transform(df["Certifications"])
    df["Recruiter Decision"] = decision_encoder.fit_transform(df["Recruiter Decision"])

    # -------- Save encoders --------

    if save_encoders:

        os.makedirs(MODELS_DIR, exist_ok=True)

        joblib.dump(education_encoder, MODELS_DIR / "education_encoder.pkl")
        joblib.dump(role_encoder, MODELS_DIR / "role_encoder.pkl")
        joblib.dump(cert_encoder, MODELS_DIR / "certification_encoder.pkl")
        joblib.dump(decision_encoder, MODELS_DIR / "decision_encoder.pkl")
        joblib.dump(mlb, MODELS_DIR / "skill_binarizer.pkl")

    # -------- Merge --------

    df = pd.concat(
        [df, skills_encoded],
        axis=1
    )

    # Drop unwanted columns

    df.drop(
        ["Resume_ID", "Name", "Skills"],
        axis=1,
        inplace=True
    )

    return df
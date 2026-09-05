from pathlib import Path

import joblib

from ml.resume_to_features import create_feature_vector

MODEL_PATH = Path(__file__).resolve().parent / "models" / "ats_model.pkl"
_model = None


def load_model():
    global _model

    if _model is None:
        _model = joblib.load(MODEL_PATH)

    return _model


def predict_resume(parsed_resume):

    model = load_model()

    features = create_feature_vector(parsed_resume)

    prediction = model.predict(features)

    return round(float(prediction[0]), 2)
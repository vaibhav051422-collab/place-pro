import joblib

from ml.resume_to_features import create_feature_vector

model = joblib.load("ml/models/ats_model.pkl")


def predict_resume(parsed_resume):

    features = create_feature_vector(parsed_resume)

    prediction = model.predict(features)

    return round(float(prediction[0]), 2)
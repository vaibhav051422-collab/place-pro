import json
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor
)
from sklearn.metrics import (
    mean_absolute_error,
    r2_score
)

from preprocessing import load_and_preprocess


# ------------------------
# Load Data
# ------------------------

df = load_and_preprocess()

# Features
X = df.drop(
    [
        "AI Score (0-100)",
        "Recruiter Decision"
    ],
    axis=1
)

# Target
y = df["AI Score (0-100)"]


# ------------------------
# Train Test Split
# ------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ------------------------
# Models
# ------------------------

models = {
    "Random Forest": RandomForestRegressor(
        n_estimators=200,
        random_state=42
    ),

    "Gradient Boosting": GradientBoostingRegressor(
        random_state=42
    )
}


best_model = None
best_score = -999


# ------------------------
# Training
# ------------------------

for name, model in models.items():

    print("\n==============================")
    print(name)
    print("==============================")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    r2 = r2_score(
        y_test,
        predictions
    )

    print("MAE :", round(mae, 2))
    print("R2  :", round(r2, 4))

    if r2 > best_score:
        best_score = r2
        best_model = model


# ------------------------
# Save Model
# ------------------------

os.makedirs(
    "ml/models",
    exist_ok=True
)

joblib.dump(
    best_model,
    "ml/models/ats_model.pkl"
)
with open("ml/models/feature_columns.json", "w") as f:
    json.dump(list(X.columns), f)
print("\n==============================")
print("BEST MODEL SAVED")
print("==============================")
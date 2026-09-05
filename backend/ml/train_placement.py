import json
import os

import joblib

from sklearn.ensemble import (
	RandomForestClassifier,
	GradientBoostingClassifier
)
from sklearn.metrics import (
	accuracy_score,
	f1_score
)
from sklearn.model_selection import train_test_split

from ml.preprocessing import load_and_preprocess


df = load_and_preprocess()

X = df.drop(
	[
		"AI Score (0-100)",
		"Recruiter Decision"
	],
	axis=1
)

y = df["Recruiter Decision"]

X_train, X_test, y_train, y_test = train_test_split(
	X,
	y,
	test_size=0.2,
	random_state=42,
	stratify=y
)

models = {
	"Random Forest": RandomForestClassifier(
		n_estimators=200,
		random_state=42
	),
	"Gradient Boosting": GradientBoostingClassifier(
		random_state=42
	)
}

best_model = None
best_score = -1

for name, model in models.items():
	print("\n==============================")
	print(name)
	print("==============================")

	model.fit(X_train, y_train)

	predictions = model.predict(X_test)

	accuracy = accuracy_score(y_test, predictions)
	f1 = f1_score(y_test, predictions, average="weighted")

	print("Accuracy:", round(accuracy, 4))
	print("F1 Score:", round(f1, 4))

	if f1 > best_score:
		best_score = f1
		best_model = model


os.makedirs("ml/models", exist_ok=True)

joblib.dump(best_model, "ml/models/placement_model.pkl")

with open("ml/models/placement_feature_columns.json", "w") as f:
	json.dump(list(X.columns), f)

print("\n==============================")
print("BEST PLACEMENT MODEL SAVED")
print("==============================")

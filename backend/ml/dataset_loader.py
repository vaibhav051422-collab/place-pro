from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DATASET_PATH = BASE_DIR / "datasets" / "AI_Resume_Screening.csv"


def get_dataset_path(dataset_path=None):
	if dataset_path is None:
		return DEFAULT_DATASET_PATH

	path = Path(dataset_path)
	if path.is_absolute():
		return path

	return BASE_DIR / path


def load_dataset(dataset_path=None):
	path = get_dataset_path(dataset_path)
	return pd.read_csv(path)


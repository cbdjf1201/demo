from functools import lru_cache
import os
from pathlib import Path

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from app.schemas.prediction import PropertyFeatures

FEATURES = [
    "square_footage",
    "bedrooms",
    "bathrooms",
    "year_built",
    "lot_size",
    "distance_to_city_center",
    "school_rating",
]


class HousingPriceModelService:
    def __init__(self) -> None:
        self.dataset_path = self._resolve_dataset_path()
        self.model = LinearRegression()
        self.metrics: dict[str, float] = {}
        self._train()

    def _resolve_dataset_path(self) -> Path:
        env_path = os.getenv("HOUSING_DATASET_PATH")
        candidates = [
            Path(env_path) if env_path else None,
            Path.cwd() / "House Price Dataset.csv",
            Path(__file__).resolve().parents[3] / "House Price Dataset.csv",
        ]
        for candidate in candidates:
            if candidate and candidate.exists():
                return candidate
        raise FileNotFoundError("House Price Dataset.csv was not found")

    def _train(self) -> None:
        data = pd.read_csv(self.dataset_path)
        x = data[FEATURES]
        y = data["price"]
        self.model.fit(x, y)
        self.feature_means = {
            feature: round(float(value), 4)
            for feature, value in x.mean().to_dict().items()
        }
        predictions = self.model.predict(x)
        self.metrics = {
            "rmse": round(float(mean_squared_error(y, predictions) ** 0.5), 2),
            "mae": round(float(mean_absolute_error(y, predictions)), 2),
            "r2": round(float(r2_score(y, predictions)), 4),
        }

    def predict_one(self, payload: PropertyFeatures) -> float:
        frame = pd.DataFrame([payload.model_dump()], columns=FEATURES)
        return round(float(self.model.predict(frame)[0]), 2)

    def predict_many(self, items: list[PropertyFeatures]) -> list[float]:
        frame = pd.DataFrame([item.model_dump() for item in items], columns=FEATURES)
        return [round(float(value), 2) for value in self.model.predict(frame)]

    def model_info(self) -> dict:
        return {
            "model_name": "linear_regression",
            "features": FEATURES,
            "coefficients": {
                feature: round(float(coefficient), 6)
                for feature, coefficient in zip(FEATURES, self.model.coef_, strict=True)
            },
            "intercept": round(float(self.model.intercept_), 6),
            "feature_means": self.feature_means,
            "metrics": self.metrics,
        }


@lru_cache
def get_model_service() -> HousingPriceModelService:
    return HousingPriceModelService()

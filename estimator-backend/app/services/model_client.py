import os

import httpx

from app.schemas.estimates import EstimateRequest


class ModelClient:
    def __init__(self) -> None:
        self.base_url = os.getenv("MODEL_API_BASE_URL", "http://localhost:8000")

    def predict_one(self, payload: EstimateRequest) -> float:
        response = httpx.post(
            f"{self.base_url}/predict",
            json=payload.model_dump(),
            timeout=10,
        )
        response.raise_for_status()
        return float(response.json()["predicted_price"])

    def model_info(self) -> dict:
        response = httpx.get(f"{self.base_url}/model-info", timeout=10)
        response.raise_for_status()
        return response.json()

    def predict_many(self, items: list[EstimateRequest]) -> list[float]:
        response = httpx.post(
            f"{self.base_url}/predict",
            json={"items": [item.model_dump() for item in items]},
            timeout=10,
        )
        response.raise_for_status()
        return [float(item["predicted_price"]) for item in response.json()["predictions"]]

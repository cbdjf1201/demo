"""HTTP 客户端：将估值请求转发至 model-api。"""
import os

import httpx

from app.schemas.estimates import EstimateRequest


class ModelClient:
    """通过 MODEL_API_BASE_URL 连接模型服务（默认 http://localhost:8000）。"""

    def __init__(self) -> None:
        self.base_url = os.getenv("MODEL_API_BASE_URL", "http://localhost:8000")

    def predict_one(self, payload: EstimateRequest) -> float:
        """POST /predict，解析响应中的 predicted_price。"""
        response = httpx.post(
            f"{self.base_url}/predict",
            json=payload.model_dump(),
            timeout=10,
        )
        response.raise_for_status()
        return float(response.json()["predicted_price"])

    def model_info(self) -> dict:
        """GET /model-info，用于特征影响图（系数与均值）。"""
        response = httpx.get(f"{self.base_url}/model-info", timeout=10)
        response.raise_for_status()
        return response.json()

    def predict_many(self, items: list[EstimateRequest]) -> list[float]:
        """批量 POST /predict，请求体为 {"items": [...]}。"""
        response = httpx.post(
            f"{self.base_url}/predict",
            json={"items": [item.model_dump() for item in items]},
            timeout=10,
        )
        response.raise_for_status()
        return [float(item["predicted_price"]) for item in response.json()["predictions"]]

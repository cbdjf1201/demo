"""估值业务：调用模型、维护内存历史、生成特征影响图数据。"""
from datetime import datetime, timezone
from functools import lru_cache
from uuid import uuid4

from app.schemas.estimates import EstimateRequest
from app.services.model_client import ModelClient


class EstimateService:
    """进程内单例；历史仅存内存，演示用不落库。"""

    def __init__(self) -> None:
        self.model_client = ModelClient()
        # 启动时拉取系数与特征均值，供结果页条形图使用
        self.model_info = self.model_client.model_info()
        self._history: list[dict] = []

    def create_estimate(self, payload: EstimateRequest) -> dict:
        """预测并追加历史，返回含 chart 的完整估价记录。"""
        predicted_price = self.model_client.predict_one(payload)
        estimate = {
            "id": str(uuid4()),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "input": payload.model_dump(),
            "predicted_price": predicted_price,
            "currency": "USD",
            "chart": self._chart_points(payload, predicted_price),
        }
        self._history.append(estimate)
        return estimate

    def history(self) -> list[dict]:
        """按创建时间倒序返回。"""
        return list(reversed(self._history))

    def compare(self, items: list[EstimateRequest]) -> list[dict]:
        """批量预测，每条生成独立 id，不含 chart。"""
        predictions = self.model_client.predict_many(items)
        return [
            {
                "id": str(uuid4()),
                "input": item.model_dump(),
                "predicted_price": prediction,
                "currency": "USD",
            }
            for item, prediction in zip(items, predictions, strict=True)
        ]

    def _chart_points(self, payload: EstimateRequest, predicted_price: float) -> list[dict]:
        """
        按线性模型估算各特征相对均值的绝对影响 |value - mean| * coef|，
        供前端条形图展示（非 SHAP，仅为演示近似）。
        """
        means = self.model_info.get("feature_means", {})
        coefficients = self.model_info.get("coefficients", {})

        points = []
        for field, label in [
            ("square_footage", "Square footage"),
            ("bedrooms", "Bedrooms"),
            ("bathrooms", "Bathrooms"),
            ("year_built", "Year built"),
            ("lot_size", "Lot size"),
            ("distance_to_city_center", "Distance"),
            ("school_rating", "School rating"),
        ]:
            coefficient = float(coefficients.get(field, 0))
            mean_value = float(means.get(field, 0))
            current_value = float(getattr(payload, field))
            impact = abs((current_value - mean_value) * coefficient)
            points.append({"label": label, "value": impact})
        return points


@lru_cache  # 共享同一份历史列表
def get_estimate_service() -> EstimateService:
    return EstimateService()

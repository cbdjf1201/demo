"""房价预测路由：支持单条与批量两种请求体。"""
from fastapi import APIRouter

from app.schemas.prediction import BatchPredictionRequest, PropertyFeatures
from app.services.model_service import get_model_service

router = APIRouter(tags=["prediction"])


@router.post("/predict")
def predict(payload: PropertyFeatures | BatchPredictionRequest) -> dict:
    """单条返回 predicted_price；批量请求体含 items 时返回 predictions 列表。"""
    service = get_model_service()

    if isinstance(payload, BatchPredictionRequest):
        predictions = service.predict_many(payload.items)
        return {
            "mode": "batch",
            "currency": "USD",
            "predictions": [
                {"index": index, "predicted_price": value}
                for index, value in enumerate(predictions)
            ],
        }

    return {
        "mode": "single",
        "currency": "USD",
        "predicted_price": service.predict_one(payload),
    }

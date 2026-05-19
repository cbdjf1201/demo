from fastapi import APIRouter

from app.schemas.prediction import BatchPredictionRequest, PropertyFeatures
from app.services.model_service import get_model_service

router = APIRouter(tags=["prediction"])


@router.post("/predict")
def predict(payload: PropertyFeatures | BatchPredictionRequest) -> dict:
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

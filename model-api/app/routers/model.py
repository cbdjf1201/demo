from fastapi import APIRouter

from app.services.model_service import get_model_service

router = APIRouter(tags=["model"])


@router.get("/model-info")
def model_info() -> dict:
    return get_model_service().model_info()

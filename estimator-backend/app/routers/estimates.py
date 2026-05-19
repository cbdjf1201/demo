from fastapi import APIRouter, Depends

from app.schemas.estimates import BatchEstimateRequest, EstimateRequest
from app.services.estimate_service import EstimateService, get_estimate_service

router = APIRouter(tags=["estimates"])


@router.post("/estimates")
def create_estimate(
    payload: EstimateRequest,
    service: EstimateService = Depends(get_estimate_service),
) -> dict:
    return service.create_estimate(payload)


@router.get("/estimates/history")
def history(service: EstimateService = Depends(get_estimate_service)) -> dict:
    return {"items": service.history()}


@router.post("/estimates/compare")
def compare(
    payload: BatchEstimateRequest,
    service: EstimateService = Depends(get_estimate_service),
) -> dict:
    return {"items": service.compare(payload.items)}

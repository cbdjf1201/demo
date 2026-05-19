"""估值 API：创建估价、查询内存历史、批量对比。"""
from fastapi import APIRouter, Depends

from app.schemas.estimates import BatchEstimateRequest, EstimateRequest
from app.services.estimate_service import EstimateService, get_estimate_service

router = APIRouter(tags=["estimates"])


@router.post("/estimates")
def create_estimate(
    payload: EstimateRequest,
    service: EstimateService = Depends(get_estimate_service),
) -> dict:
    """提交表单特征，调用模型 API 并写入进程内历史。"""
    return service.create_estimate(payload)


@router.get("/estimates/history")
def history(service: EstimateService = Depends(get_estimate_service)) -> dict:
    """返回本会话内估价记录，最新在前；重启后清空。"""
    return {"items": service.history()}


@router.post("/estimates/compare")
def compare(
    payload: BatchEstimateRequest,
    service: EstimateService = Depends(get_estimate_service),
) -> dict:
    """多套房并排预测，不写入历史。"""
    return {"items": service.compare(payload.items)}

"""模型元数据路由：系数、特征均值与训练集评估指标。"""
from fastapi import APIRouter

from app.services.model_service import get_model_service

router = APIRouter(tags=["model"])


@router.get("/model-info")
def model_info() -> dict:
    """首次调用会触发单例训练；后续从内存返回。"""
    return get_model_service().model_info()

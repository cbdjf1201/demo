"""健康检查路由，供编排脚本或负载均衡探测模型服务是否存活。"""
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    """返回固定 OK 状态，不触发模型加载。"""
    return {"status": "ok", "service": "housing-price-model-api"}

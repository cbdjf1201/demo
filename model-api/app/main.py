"""房价预测模型 API 入口（默认端口 8000），供估值与市场分析后端调用。"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.health import router as health_router
from app.routers.model import router as model_router
from app.routers.predict import router as predict_router

app = FastAPI(
    title="Housing Price Model API",
    description="FastAPI service for housing price regression predictions.",
    version="1.0.0",
)

# 允许门户与市场分析 Java 后端跨域调用
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(model_router)
app.include_router(predict_router)

"""房产估值后端入口（默认端口 8001）：表单估值、历史记录与多方案对比。"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.estimates import router as estimates_router
from app.routers.health import router as health_router

app = FastAPI(
    title="Property Value Estimator Backend",
    description="Python backend for estimator form submission, history, and comparison.",
    version="1.0.0",
)

# 允许 Next.js 门户（localhost:3000）跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(estimates_router, prefix="/api/estimator/v1")

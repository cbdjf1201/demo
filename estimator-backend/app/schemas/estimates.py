"""估值请求体；字段与 model-api 的 PropertyFeatures 对齐。"""
from pydantic import BaseModel, Field


class EstimateRequest(BaseModel):
    """门户表单提交的房产特征。"""
    square_footage: int = Field(gt=0)
    bedrooms: int = Field(ge=0)
    bathrooms: float = Field(ge=0)
    year_built: int = Field(ge=1800, le=2100)
    lot_size: int = Field(gt=0)
    distance_to_city_center: float = Field(ge=0)
    school_rating: float = Field(ge=0, le=10)


class BatchEstimateRequest(BaseModel):
    """对比页一次提交多套特征。"""

    items: list[EstimateRequest] = Field(min_length=1)

"""预测请求体校验；字段约束与门户/估值后端及 Java DTO 保持一致。"""
from pydantic import BaseModel, Field


class PropertyFeatures(BaseModel):
    """单套房产特征，对应 CSV 中除 id/price 外的列。"""
    square_footage: int = Field(gt=0)
    bedrooms: int = Field(ge=0)
    bathrooms: float = Field(ge=0)
    year_built: int = Field(ge=1800, le=2100)
    lot_size: int = Field(gt=0)
    distance_to_city_center: float = Field(ge=0)
    school_rating: float = Field(ge=0, le=10)


class BatchPredictionRequest(BaseModel):
    """批量预测：请求体为 {"items": [...]}，与估值对比接口共用形态。"""

    items: list[PropertyFeatures] = Field(min_length=1)

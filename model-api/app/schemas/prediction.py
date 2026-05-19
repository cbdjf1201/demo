from pydantic import BaseModel, Field


class PropertyFeatures(BaseModel):
    square_footage: int = Field(gt=0)
    bedrooms: int = Field(ge=0)
    bathrooms: float = Field(ge=0)
    year_built: int = Field(ge=1800, le=2100)
    lot_size: int = Field(gt=0)
    distance_to_city_center: float = Field(ge=0)
    school_rating: float = Field(ge=0, le=10)


class BatchPredictionRequest(BaseModel):
    items: list[PropertyFeatures] = Field(min_length=1)

# Market Analysis Backend

Java 21 + Spring Boot 3.4.4 service for Property Market Analysis.

## Environment
- `HOUSING_DATASET_PATH`: path to `House Price Dataset.csv`
- `HOUSING_MODEL_API_BASE_URL`: base URL for the FastAPI model API

## Endpoints
- `GET /api/market/v1/summary`
- `GET /api/market/v1/segments`
- `POST /api/market/v1/what-if`
- `GET /api/market/v1/exports/market.csv`
- `GET /api/market/v1/exports/market.pdf`

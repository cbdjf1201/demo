FROM python:3.12-slim

WORKDIR /app

COPY model-api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY model-api/app ./app
COPY ["House Price Dataset.csv", "./House Price Dataset.csv"]

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

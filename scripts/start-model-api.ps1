$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$python = Join-Path $root "tools\\python312\\python.exe"
$env:HOUSING_DATASET_PATH = Join-Path $root "House Price Dataset.csv"
Push-Location (Join-Path $root "model-api")
try {
  & $python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
} finally {
  Pop-Location
}

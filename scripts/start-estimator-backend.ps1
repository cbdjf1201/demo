$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$python = Join-Path $root "tools\\python312\\python.exe"
$env:MODEL_API_BASE_URL = "http://127.0.0.1:8000"
Push-Location (Join-Path $root "estimator-backend")
try {
  & $python -m uvicorn app.main:app --host 0.0.0.0 --port 8001
} finally {
  Pop-Location
}

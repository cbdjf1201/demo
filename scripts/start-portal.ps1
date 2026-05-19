$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$env:NEXT_PUBLIC_ESTIMATOR_API_BASE_URL = "http://localhost:8001/api/estimator/v1"
$env:NEXT_PUBLIC_MARKET_API_BASE_URL = "http://localhost:8082/api/market/v1"
$env:MARKET_API_BASE_URL = "http://localhost:8082/api/market/v1"
Push-Location (Join-Path $root "portal")
try {
  cmd /c npm run start
} finally {
  Pop-Location
}

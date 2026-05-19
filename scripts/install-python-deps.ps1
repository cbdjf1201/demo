$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$python = Join-Path $root "tools\\python312\\python.exe"

Push-Location (Join-Path $root "model-api")
try {
  & $python -m pip install -r requirements.txt
} finally {
  Pop-Location
}

Push-Location (Join-Path $root "estimator-backend")
try {
  & $python -m pip install -r requirements.txt
} finally {
  Pop-Location
}

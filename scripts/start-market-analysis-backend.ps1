$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$javaHome = Join-Path $root "tools\\jdk21"
$mavenHome = Join-Path $root "tools\\maven"
$env:JAVA_HOME = $javaHome
$env:M2_HOME = $mavenHome
$env:Path = (Join-Path $javaHome "bin") + ";" + (Join-Path $mavenHome "bin") + ";" + $env:Path
$env:HOUSING_DATASET_PATH = Join-Path $root "House Price Dataset.csv"
$env:HOUSING_MODEL_API_BASE_URL = "http://127.0.0.1:8000"
Push-Location (Join-Path $root "market-analysis-backend")
try {
  & (Join-Path $mavenHome "bin\\mvn.cmd") spring-boot:run
} finally {
  Pop-Location
}

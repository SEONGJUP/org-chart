$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Port = if ($env:PORT) { $env:PORT } else { "3001" }
$LogDir = Join-Path $Root ".logs"
$OutLog = Join-Path $LogDir "preview-static.out.log"
$ErrLog = Join-Path $LogDir "preview-static.err.log"

if (-not (Test-Path -LiteralPath $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir | Out-Null
}

$existing = netstat -ano |
  Select-String ":$Port" |
  ForEach-Object { ($_ -split "\s+")[-1] } |
  Where-Object { $_ -match "^\d+$" -and $_ -ne "0" } |
  Sort-Object -Unique

foreach ($processId in $existing) {
  taskkill.exe /PID $processId /F | Out-Null
}

Push-Location $Root
try {
  cmd.exe /c npm.cmd run build
  if ($LASTEXITCODE -ne 0) {
    throw "Build failed with exit code $LASTEXITCODE"
  }

  $command = "cd /d `"$Root`" && set PORT=$Port && node scripts/local-static-server.mjs 1>> `"$OutLog`" 2>> `"$ErrLog`""
  $process = Start-Process `
    -FilePath "cmd.exe" `
    -ArgumentList "/k `"$command`"" `
    -WorkingDirectory $Root `
    -WindowStyle Hidden `
    -PassThru

  Start-Sleep -Seconds 2
  $health = Invoke-WebRequest -UseBasicParsing "http://localhost:$Port/__health" -TimeoutSec 20
  if ($health.StatusCode -ne 200) {
    throw "Preview server health check failed."
  }

  Write-Host "SafeBuddy preview is running in the background."
  Write-Host "PID: $($process.Id)"
  Write-Host "URL: http://localhost:$Port/half-year-inspection"
  Write-Host "Logs: $LogDir"
}
finally {
  Pop-Location
}

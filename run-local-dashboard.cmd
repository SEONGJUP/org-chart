@echo off
setlocal

cd /d "%~dp0"

echo [%date% %time%] Restarting local dashboard on port 3001... >> "%~dp0local-dashboard.log"

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /T /F >> "%~dp0local-dashboard.log" 2>&1
)

call npm.cmd run build >> "%~dp0local-dashboard.log" 2>&1
if errorlevel 1 (
  echo [%date% %time%] Build failed. Server was not started. >> "%~dp0local-dashboard.log"
  exit /b 1
)

call npm.cmd run serve:local >> "%~dp0local-dashboard.log" 2>&1

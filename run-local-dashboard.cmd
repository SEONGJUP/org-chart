@echo off
setlocal

cd /d "%~dp0"

echo [%date% %time%] Restarting local dashboard in dev mode on port 3001... >> "%~dp0local-dashboard.log"

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /T /F >> "%~dp0local-dashboard.log" 2>&1
)

if exist "%~dp0.next\cache" (
  echo [%date% %time%] Clearing Next.js dev cache... >> "%~dp0local-dashboard.log"
  rmdir /s /q "%~dp0.next\cache" >> "%~dp0local-dashboard.log" 2>&1
)

call npm.cmd run dev:local >> "%~dp0local-dashboard.log" 2>&1

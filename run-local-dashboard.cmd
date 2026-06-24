@echo off
setlocal

cd /d "%~dp0"
call npm.cmd run serve:local >> "%~dp0.local-dashboard.log" 2>&1

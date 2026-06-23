@echo off
setlocal

cd /d "%~dp0"
call npm.cmd run start >> "%~dp0.local-dashboard.log" 2>&1

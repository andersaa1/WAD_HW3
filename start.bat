@echo off
REM Start the backend server with nodemon
start cmd /k "cd /d %~dp0\backend && nodemon server"

REM Start the frontend
start cmd /k "cd /d %~dp0\hw3 && npm run serve"

REM Keep the script running
pause
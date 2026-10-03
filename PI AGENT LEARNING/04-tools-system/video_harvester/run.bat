@echo off
echo Starting YouTube Harvester API...
start "YouTube Harvester Server" cmd /c "python -m uvicorn server:app --host 127.0.0.1 --port 8765 --reload"

echo Waiting for server to start...
timeout /t 3 /nobreak >nul

echo Opening Dashboard in browser...
start http://127.0.0.1:8765

echo Done! Leave the server window open.
pause

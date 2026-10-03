#!/bin/bash
echo "Starting YouTube Harvester API..."
python3 -m uvicorn server:app --host 127.0.0.1 --port 8765 --reload &
PID=$!

echo "Waiting for server to start..."
sleep 3

echo "Opening Dashboard in browser..."
if which xdg-open > /dev/null
then
  xdg-open http://127.0.0.1:8765
elif which open > /dev/null
then
  open http://127.0.0.1:8765
fi

echo "Server running (PID $PID). Press Ctrl+C to stop."
wait $PID

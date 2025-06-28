#!/bin/bash
echo "Starting AI Tweet Generator API..."
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT 
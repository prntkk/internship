@echo off
echo Setting up AI Tweet Generator...

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Get your OpenRouter API key from https://openrouter.ai/keys
echo 2. Create a .env file in the backend folder with your API key
echo 3. Run start-backend.bat to start the backend server
echo 4. Run start-frontend.bat to start the frontend server
echo.
pause 
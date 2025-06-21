@echo off
echo ========================================
echo Setting up AI Tweet Generator Project
echo ========================================

echo.
echo [1/4] Installing Python dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Python dependencies installed successfully

echo.
echo [2/4] Creating .env file...
if not exist .env (
    echo OPENROUTER_API_KEY=your_openrouter_api_key_here > .env
    echo EXTERNAL_API_BASE_URL=https://twitter-clone-ui.pages.dev >> .env
    echo EXTERNAL_API_ENDPOINT=/api/posts >> .env
    echo EXTERNAL_API_TIMEOUT=10 >> .env
    echo DEFAULT_EXTERNAL_API_KEY=prantik_fe67235324979e8b9fe8bdfb4cfb62af >> .env
    echo EXTERNAL_USERNAME=prantik >> .env
    echo ✅ .env file created
    echo ⚠️  Please update OPENROUTER_API_KEY in backend/.env with your actual API key
) else (
    echo ✅ .env file already exists
)

cd ..

echo.
echo [3/4] Installing Node.js dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo ✅ Node.js dependencies installed successfully

cd ..

echo.
echo [4/4] Setup complete!
echo.
echo ========================================
echo 🚀 Ready to start the application!
echo ========================================
echo.
echo To start the backend:
echo   start-backend.bat
echo.
echo To start the frontend (in a new terminal):
echo   start-frontend.bat
echo.
echo Don't forget to:
echo 1. Update OPENROUTER_API_KEY in backend/.env
echo 2. Make sure both backend and frontend are running
echo.
pause 
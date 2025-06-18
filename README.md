# AI Tweet Generator

A full-stack web application that generates AI-powered tweets using Langchain and OpenRouter API.

## Tech Stack

- **Frontend**: Solid.js with routing
- **Backend**: FastAPI
- **AI Model**: Langchain with OpenRouter API (Deepseek R1 + Qwen)
- **Database**: SQLite with SQLAlchemy
- **Styling**: Tailwind CSS

## Project Structure

```
twtproject/
├── frontend/          # Solid.js frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chatbot.jsx    # Main tweet generation page
│   │   │   ├── Feed.jsx       # Tweet feed page
│   │   │   └── Navigation.jsx # App navigation
│   │   ├── App.jsx            # Main app component with routing
│   │   ├── api.js             # API service functions
│   │   ├── index.jsx          # App entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── postcss.config.js      # PostCSS configuration
├── backend/           # FastAPI backend application
│   ├── main.py               # FastAPI app with endpoints
│   ├── database.py           # SQLAlchemy database setup
│   ├── models.py             # Pydantic models
│   ├── ai_service.py         # AI service with Langchain
│   ├── requirements.txt      # Python dependencies
│   └── env.example           # Environment variables example
├── setup.bat                 # Setup script for dependencies
├── start-backend.bat         # Backend startup script
├── start-frontend.bat        # Frontend startup script
├── README.md                 # This file
└── .gitignore               # Git ignore file
```

## Features

1. **Chatbot Page ('/')**: Generate tweets by typing prompts
2. **Feed Page ('/feed')**: View all generated tweets in a styled feed
3. **Modern UI**: Beautiful, responsive design with Tailwind CSS
4. **Real-time Generation**: Instant tweet generation with AI
5. **Persistent Storage**: All tweets saved to SQLite database

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenRouter API key (get one at https://openrouter.ai/keys)

### Automated Setup (Windows)

1. Run the setup script:
   ```bash
   setup.bat
   ```

2. Create a `.env` file in the `backend` folder:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

3. Start the backend:
   ```bash
   start-backend.bat
   ```

4. Start the frontend (in a new terminal):
   ```bash
   start-frontend.bat
   ```

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your OpenRouter API key:
   ```bash
   # Create .env file
   echo OPENROUTER_API_KEY=your_api_key_here > .env
   ```

4. Run the backend server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /`: Health check
- `POST /generate-tweet`: Generate a new tweet from a prompt
- `GET /tweets`: Retrieve all generated tweets
- `GET /health`: API health status

## Usage

1. Open `http://localhost:3000` in your browser
2. Use the chatbot page to generate tweets by typing prompts
3. View all generated tweets on the feed page at `/feed`
4. Navigate between pages using the navigation bar

## Development

### Backend Development

The backend uses FastAPI with the following structure:
- `main.py`: Main application with API endpoints
- `database.py`: SQLAlchemy database configuration
- `models.py`: Pydantic models for request/response validation
- `ai_service.py`: AI service using Langchain with OpenRouter

### Frontend Development

The frontend uses Solid.js with:
- Component-based architecture
- Client-side routing with `@solidjs/router`
- Tailwind CSS for styling
- Axios for API communication

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Troubleshooting

1. **Backend won't start**: Make sure you have Python 3.8+ and all dependencies installed
2. **Frontend won't start**: Make sure you have Node.js 16+ and run `npm install`
3. **API calls failing**: Check that the backend is running on port 8000 and CORS is configured
4. **AI generation failing**: Verify your OpenRouter API key is correct and has credits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request 
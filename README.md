# AI Tweet Generator

A full-stack web application that generates AI-powered tweets using Langchain and OpenRouter API, with the ability to post tweets to external Twitter clone websites.

## Tech Stack

- **Frontend**: Solid.js with routing
- **Backend**: FastAPI
- **AI Model**: Langchain with OpenRouter API (GPT-3.5-turbo + Claude-3-haiku)
- **Database**: SQLite with SQLAlchemy
- **Styling**: Tailwind CSS

## Project Structure

```
twtproject/
├── frontend/          # Solid.js frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chatbot.jsx           # Main tweet generation page
│   │   │   ├── Feed.jsx              # Tweet feed page with delete functionality
│   │   │   ├── Navigation.jsx        # App navigation
│   │   │   └── ExternalPostModal.jsx # Modal for reviewing and posting to external sites
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── api.js                    # API service functions
│   │   ├── index.jsx                 # App entry point
│   │   └── index.css                 # Global styles
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── postcss.config.js             # PostCSS configuration
├── backend/           # FastAPI backend application
│   ├── main.py                       # FastAPI app with endpoints
│   ├── database.py                   # SQLAlchemy database setup
│   ├── models.py                     # Pydantic models
│   ├── ai_service.py                 # AI service with Langchain
│   ├── config.py                     # Configuration management
│   ├── requirements.txt              # Python dependencies
│   └── .env                          # Environment variables (create this)
├── setup.bat                         # Setup script for dependencies
├── start-backend.bat                 # Backend startup script
├── start-frontend.bat                # Frontend startup script
├── README.md                         # This file
└── .gitignore                        # Git ignore file
```

## Features

1. **AI Tweet Generation**: Generate engaging tweets using GPT-3.5-turbo and Claude-3-haiku
2. **Tweet Feed**: View all generated tweets in a beautiful, responsive feed
3. **Delete Functionality**: Remove unwanted tweets with confirmation dialogs
4. **External Posting**: Post tweets to external Twitter clone websites with review/edit capability
5. **Modern UI**: Beautiful, responsive design with Tailwind CSS
6. **Real-time Generation**: Instant tweet generation with AI
7. **Persistent Storage**: All tweets saved to SQLite database
8. **Navigation**: Easy switching between generate and feed pages

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
   EXTERNAL_API_BASE_URL=https://your-twitter-clone-api.com
   EXTERNAL_API_ENDPOINT=/api/posts
   EXTERNAL_API_TIMEOUT=10
   DEFAULT_EXTERNAL_API_KEY=prantik_fe67235324979e8b9fe8bdfb4cfb62af
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

3. Set up your environment variables:
   ```bash
   # Create .env file
   echo OPENROUTER_API_KEY=your_api_key_here > .env
   echo EXTERNAL_API_BASE_URL=https://your-twitter-clone-api.com >> .env
   echo EXTERNAL_API_ENDPOINT=/api/posts >> .env
   echo EXTERNAL_API_TIMEOUT=10 >> .env
   echo DEFAULT_EXTERNAL_API_KEY=prantik_fe67235324979e8b9fe8bdfb4cfb62af >> .env
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
- `DELETE /tweets/{tweet_id}`: Delete a specific tweet
- `POST /post-to-external`: Post a tweet to external Twitter clone website
- `GET /health`: API health status

## Usage

1. Open `http://localhost:3000` in your browser
2. **Generate Page**: Type prompts to create AI-generated tweets
3. **Feed Page**: View all your tweets and delete unwanted ones
4. **External Posting**: Click "Review & Post to External Site" to post tweets to external Twitter clone
5. Navigate between pages using the top navigation bar

## Features in Detail

### AI Tweet Generation
- Uses GPT-3.5-turbo as primary model
- Claude-3-haiku as fallback model
- Topic-specific responses (no generic fallbacks)
- Character limit enforcement (280 chars)
- Automatic hashtag generation

### Tweet Management
- View all generated tweets in chronological order
- Delete tweets with confirmation dialogs
- Real-time updates after deletion
- Loading states and error handling

### External Posting
- Review and edit tweets before posting to external sites
- Configurable API endpoints and authentication
- Real-time preview of how the tweet will look
- Error handling and success notifications
- Character count validation

### User Interface
- Modern, responsive design
- Dark/light theme compatible
- Smooth animations and transitions
- Mobile-friendly layout
- Modal-based review interface

## Development

### Backend Development

The backend uses FastAPI with the following structure:
- `main.py`: Main application with API endpoints
- `database.py`: SQLAlchemy database configuration
- `models.py`: Pydantic models for request/response validation
- `ai_service.py`: AI service using Langchain with OpenRouter
- `config.py`: Configuration management for external APIs

### Frontend Development

The frontend uses Solid.js with:
- Component-based architecture
- Client-side routing
- Tailwind CSS for styling
- Axios for API communication
- Modal components for external posting

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Required for AI tweet generation
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: External Twitter Clone API Configuration
EXTERNAL_API_BASE_URL=https://your-twitter-clone-api.com
EXTERNAL_API_ENDPOINT=/api/posts
EXTERNAL_API_TIMEOUT=10
DEFAULT_EXTERNAL_API_KEY=prantik_fe67235324979e8b9fe8bdfb4cfb62af
```

## External API Integration

The application supports posting tweets to external Twitter clone websites:

1. **Configuration**: Set up the external API URL and endpoint in the `.env` file
2. **Authentication**: Use the provided API key for authentication
3. **Review Process**: Users can review and edit tweets before posting
4. **Error Handling**: Comprehensive error handling for network issues and API errors

### External API Requirements

The external API should accept:
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {api_key}`
- **Body**: 
  ```json
  {
    "content": "tweet content",
    "timestamp": "2024-01-01T12:00:00Z"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "external_tweet_id",
    "success": true
  }
  ```

## Troubleshooting

1. **Backend won't start**: Make sure you have Python 3.8+ and all dependencies installed
2. **Frontend won't start**: Make sure you have Node.js 16+ and run `npm install`
3. **API calls failing**: Check that the backend is running on port 8000
4. **AI generation failing**: Verify your OpenRouter API key is correct and has credits
5. **Delete not working**: Check that the backend is running and the tweet ID is valid
6. **External posting failing**: Verify the external API URL and authentication are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is open source and available under the MIT License.

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# External Twitter Clone API Configuration
EXTERNAL_API_CONFIG = {
    "base_url": os.getenv("EXTERNAL_API_BASE_URL", "https://twitterclone-server-2xz2.onrender.com"),
    "endpoint": os.getenv("EXTERNAL_API_ENDPOINT", "/post_tweet"),
    "timeout": int(os.getenv("EXTERNAL_API_TIMEOUT", "10")),
    "default_api_key": os.getenv("DEFAULT_EXTERNAL_API_KEY", "prantik_fe67235324979e8b9fe8bdfb4cfb62af"),
    "username": os.getenv("EXTERNAL_USERNAME", "prantik")
}

# Get the full external API URL
def get_external_api_url():
    return f"{EXTERNAL_API_CONFIG['base_url']}{EXTERNAL_API_CONFIG['endpoint']}"

# Get external API headers - using their format
def get_external_api_headers(api_key):
    return {
        "api-key": api_key,  # Changed from Authorization: Bearer to api-key
        "Content-Type": "application/json"
    }

OPENROUTER_API_KEY = "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"
TWITTER_CLONE_API_URL = "https://twitterclone-server-2xz2.onrender.com/post_tweet"
TWITTER_CLONE_USERNAME = "prantik"
TWITTER_CLONE_API_KEY = "prantik_fe67235324979e8b9fe8bdfb4cfb62af" 
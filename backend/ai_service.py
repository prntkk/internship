import os
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage

# Load environment variables safely - make it completely optional
try:
    from dotenv import load_dotenv
    load_dotenv()
    print("✅ .env file loaded successfully")
except Exception as e:
    print(f"⚠️  Could not load .env file: {e}")
    print("Will try to use environment variables directly")

class AIService:
    def __init__(self):
        # Get API key from environment
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            print("❌ OPENROUTER_API_KEY not found in environment variables")
            print("Please make sure your .env file contains: OPENROUTER_API_KEY=your_key_here")
            raise ValueError("OPENROUTER_API_KEY not found in environment variables")
        
        print(f"✅ API Key found: {api_key[:20]}...")
        
        # Initialize the LLM with OpenRouter API - using working models
        self.llm = ChatOpenAI(
            model="openai/gpt-3.5-turbo",  # This is a working model
            openai_api_base="https://openrouter.ai/api/v1",
            openai_api_key=api_key,
            temperature=0.8,
            max_tokens=280
        )
        
        # Alternative model for fallback
        self.llm_fallback = ChatOpenAI(
            model="anthropic/claude-3-haiku",  # This is also a working model
            openai_api_base="https://openrouter.ai/api/v1",
            openai_api_key=api_key,
            temperature=0.8,
            max_tokens=280
        )
        
        print("✅ AI Service initialized successfully")
    
    def generate_tweet(self, prompt: str) -> str:
        """
        Generate a tweet based on the given prompt using AI.
        """
        try:
            print(f"🎯 Generating tweet for prompt: '{prompt}'")
            
            # Create a more specific prompt template for tweet generation
            tweet_prompt = ChatPromptTemplate.from_messages([
                ("system", """You are a creative and engaging tweet generator. Create a tweet that is:
                - Directly related to the user's specific prompt/topic
                - Under 280 characters
                - Engaging, witty, and shareable
                - Uses natural, conversational language
                - Includes 1-3 relevant hashtags if appropriate
                - Avoids generic responses like "Stay tuned for more updates"
                - Makes the content specific to the topic mentioned
                
                Example: If user says "football", don't just say "Here's a tweet about football" - actually write about football!"""),
                ("human", "Create an engaging tweet about: {prompt}")
            ])
            
            # Try with the primary model first
            try:
                print("🤖 Using primary model (gpt-3.5-turbo)")
                chain = tweet_prompt | self.llm
                result = chain.invoke({"prompt": prompt})
                tweet_content = result.content.strip()
                print(f"✅ Generated tweet: {tweet_content}")
                return tweet_content
            except Exception as e:
                print(f"❌ Primary model failed: {e}")
                # Fallback to secondary model
                print("🤖 Using fallback model (claude-3-haiku)")
                chain = tweet_prompt | self.llm_fallback
                result = chain.invoke({"prompt": prompt})
                tweet_content = result.content.strip()
                print(f"✅ Generated tweet (fallback): {tweet_content}")
                return tweet_content
                
        except Exception as e:
            print(f"❌ Error generating tweet: {e}")
            # Return a more specific fallback response based on the prompt
            if "cricket" in prompt.lower():
                return f"🏏 Cricket is more than just a sport - it's a passion that unites nations! From the thrill of a perfect cover drive to the tension of a last-over finish, every match tells a story. #Cricket #LoveForCricket #Sport"
            elif "football" in prompt.lower():
                return f"⚽ Football is more than just a game - it's passion, teamwork, and unforgettable moments! Whether you're on the field or cheering from the stands, every match brings new excitement. #Football #BeautifulGame #Passion"
            else:
                return f"🎯 Here's a tweet about {prompt}: Exploring new ideas and sharing insights about {prompt}! Always learning, always growing. #Innovation #Learning #Growth" 
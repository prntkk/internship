const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tweetAPI = {
  // Generate a new tweet
  generateTweet: async (prompt) => {
    try {
      const response = await api.post('/generate-tweet', { prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating tweet:', error);
      throw error;
    }
  },

  // Get all tweets
  getTweets: async () => {
    try {
      const response = await api.get('/tweets');
      return response.data;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      throw error;
    }
  },

  // Delete a tweet by ID
  deleteTweet: async (tweetId) => {
    try {
      const response = await api.delete(`/tweets/${tweetId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tweet:', error);
      throw error;
    }
  },

  // Post tweet to external Twitter clone
  postToExternal: async (tweetId, content) => {
    try {
      const response = await api.post('/post-to-external', {
        tweet_id: tweetId,
        content: content
      });
      return response.data;
    } catch (error) {
      console.error('Error posting to external site:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}; 
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  spoonacular: {
    apiKey: process.env.SPOONACULAR_API_KEY,
    baseUrl: process.env.SPOONACULAR_BASE_URL || 'https://api.spoonacular.com',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
};

// Validate required configuration
if (!config.spoonacular.apiKey) {
  process.exit(1);
}

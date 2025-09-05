# Grocery Planner API

Express API server that proxies requests to the Spoonacular API for the grocery planner application.

## Project Structure

```
api/
├── config/
│   └── index.ts          # Configuration and environment variables
├── middleware/
│   ├── cors.ts           # CORS middleware
│   └── errorHandler.ts   # Error handling middleware
├── routes/
│   ├── health.ts         # Health check endpoint
│   ├── recipes.ts        # Recipe search and details endpoints
│   └── index.ts          # Route aggregator
├── index.ts              # Main server file
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Setup

1. Copy the environment example file:
   ```bash
   cp env.example .env
   ```

2. Get a Spoonacular API key from [spoonacular.com](https://spoonacular.com/food-api) and add it to your `.env` file:
   ```
   SPOONACULAR_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Running the API

- Development mode (with hot reload):
  ```bash
  yarn dev
  ```

- From the main project directory (API only):
  ```bash
  yarn dev:api
  ```

- Frontend only:
  ```bash
  yarn dev:frontend
  ```

## API Endpoints

- `GET /health` - Health check
- `GET /recipes/search?query=<search_term>` - Search for recipes
- `GET /recipes/:id` - Get detailed recipe information

## Environment Variables

- `SPOONACULAR_API_KEY` - Your Spoonacular API key (required)
- `SPOONACULAR_BASE_URL` - Spoonacular API base URL (default: https://api.spoonacular.com)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS origin for frontend (default: http://localhost:5173)

## Architecture

The API is organized into modular components:

- **Config**: Centralized configuration management
- **Middleware**: Reusable middleware functions (CORS, error handling)
- **Routes**: Organized by feature (health, recipes)
- **Main**: Clean server setup and startup

This structure makes the codebase more maintainable, testable, and scalable.
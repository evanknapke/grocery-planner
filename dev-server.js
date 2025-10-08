// Simple development server for local testing
// Run with: node dev-server.js

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'grocery-planner-api-dev'
  });
});

// Recipe search
app.get('/recipes/search', async (req, res) => {
  try {
    const { query, ...otherParams } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query parameter is required' 
      });
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'API key not configured' 
      });
    }

    // Check if API key is valid by making a test request
    try {
      const testResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=test&number=1`);
      
      const spoonacularParams = new URLSearchParams({
        apiKey,
        query: query,
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        metaInformation: 'true',
        ...otherParams,
      });

      const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?${spoonacularParams.toString()}`;
      const response = await axios.get(spoonacularUrl);
      
      res.json({
        success: true,
        data: response.data,
        message: 'Recipes retrieved successfully'
      });
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        // API key is invalid, return mock data for testing
        const mockData = {
          results: [
            {
              id: 1,
              title: `Mock Recipe for "${query}"`,
              image: 'https://via.placeholder.com/300x200?text=Mock+Recipe',
              readyInMinutes: 30,
              servings: 4,
              sourceUrl: 'https://example.com',
              summary: `This is a mock recipe result for "${query}". Please update your Spoonacular API key to get real results.`,
              extendedIngredients: [
                {
                  id: 1,
                  name: 'Mock Ingredient 1',
                  amount: 1,
                  unit: 'cup',
                  aisle: 'Mock Aisle'
                },
                {
                  id: 2,
                  name: 'Mock Ingredient 2',
                  amount: 2,
                  unit: 'tbsp',
                  aisle: 'Mock Aisle'
                }
              ]
            }
          ],
          totalResults: 1,
          offset: 0,
          number: 1
        };
        
        res.json({
          success: true,
          data: mockData,
          message: 'Mock recipes returned (API key invalid)'
        });
      } else {
        throw apiError;
      }
    }
  } catch (error) {
    console.error('Recipe search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search recipes' 
    });
  }
});

// Recipe details
app.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid recipe ID is required' 
      });
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'API key not configured' 
      });
    }

    try {
      const spoonacularParams = new URLSearchParams({
        apiKey,
        includeNutrition: 'true',
        metaInformation: 'true',
      });

      const spoonacularUrl = `https://api.spoonacular.com/recipes/${id}/information?${spoonacularParams.toString()}`;
      const response = await axios.get(spoonacularUrl);
      
      res.json({
        success: true,
        data: response.data,
        message: 'Recipe details retrieved successfully'
      });
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        // API key is invalid, return mock data for testing
        const mockRecipe = {
          id: parseInt(id),
          title: `Mock Recipe ${id}`,
          image: 'https://via.placeholder.com/300x200?text=Mock+Recipe',
          readyInMinutes: 30,
          servings: 4,
          sourceUrl: 'https://example.com',
          summary: `This is mock recipe details for recipe ${id}. Please update your Spoonacular API key to get real results.`,
          extendedIngredients: [
            {
              id: 1,
              name: 'Mock Ingredient 1',
              amount: 1,
              unit: 'cup',
              aisle: 'Mock Aisle'
            },
            {
              id: 2,
              name: 'Mock Ingredient 2',
              amount: 2,
              unit: 'tbsp',
              aisle: 'Mock Aisle'
            }
          ],
          instructions: [
            {
              number: 1,
              step: 'This is a mock instruction. Please update your Spoonacular API key to get real recipe instructions.'
            }
          ]
        };
        
        res.json({
          success: true,
          data: mockRecipe,
          message: 'Mock recipe details returned (API key invalid)'
        });
      } else {
        throw apiError;
      }
    }
  } catch (error) {
    console.error('Recipe details error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recipe details' 
    });
  }
});

// Grocery lists (simple in-memory storage)
let groceryLists = [];

app.get('/grocery-lists', (req, res) => {
  res.json({
    success: true,
    data: groceryLists,
    message: 'Grocery lists retrieved successfully'
  });
});

app.post('/grocery-lists', (req, res) => {
  const { items, savedAt } = req.body;
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      message: 'Items array is required'
    });
  }

  const newList = {
    id: Date.now().toString(),
    items,
    savedAt: savedAt || new Date().toISOString()
  };

  groceryLists.push(newList);

  res.status(201).json({
    success: true,
    data: newList,
    message: 'Grocery list saved successfully'
  });
});

app.get('/grocery-lists/:id', (req, res) => {
  const { id } = req.params;
  const list = groceryLists.find(l => l.id === id);
  
  if (!list) {
    return res.status(404).json({
      success: false,
      message: 'Grocery list not found'
    });
  }

  res.json({
    success: true,
    data: list,
    message: 'Grocery list retrieved successfully'
  });
});

app.delete('/grocery-lists/:id', (req, res) => {
  const { id } = req.params;
  const listIndex = groceryLists.findIndex(l => l.id === id);
  
  if (listIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Grocery list not found'
    });
  }

  groceryLists.splice(listIndex, 1);

  res.json({
    success: true,
    data: null,
    message: 'Grocery list deleted successfully'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Development server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Recipe search: http://localhost:${PORT}/recipes/search?query=pasta`);
});

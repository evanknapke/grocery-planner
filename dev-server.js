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

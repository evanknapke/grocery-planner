import { Router } from 'express';
import axios from 'axios';
import { config } from '../config/index.js';

const router = Router();

// Recipe search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query, ...otherParams } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query parameter is required' 
      });
    }

    // Build Spoonacular API URL
    const spoonacularParams = new URLSearchParams({
      apiKey: config.spoonacular.apiKey!,
      query: query as string,
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      metaInformation: 'true',
      ...otherParams,
    });

    const spoonacularUrl = `${config.spoonacular.baseUrl}/recipes/complexSearch?${spoonacularParams.toString()}`;
    
    console.log('Proxying request to:', spoonacularUrl.replace(config.spoonacular.apiKey!, '***'));

    const response = await axios.get(spoonacularUrl);
    res.json({
      success: true,
      data: response.data,
      message: 'Recipes retrieved successfully'
    });
  } catch (error) {
    console.error('Error searching recipes:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to search recipes';
      res.status(status).json({ 
        success: false, 
        message: message 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
});

// Recipe details endpoint
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid recipe ID is required' 
      });
    }

    // Build Spoonacular API URL
    const spoonacularParams = new URLSearchParams({
      apiKey: config.spoonacular.apiKey!,
      includeNutrition: 'true',
      metaInformation: 'true',
    });

    const spoonacularUrl = `${config.spoonacular.baseUrl}/recipes/${id}/information?${spoonacularParams.toString()}`;
    
    console.log('Proxying request to:', spoonacularUrl.replace(config.spoonacular.apiKey!, '***'));

    const response = await axios.get(spoonacularUrl);
    res.json({
      success: true,
      data: response.data,
      message: 'Recipe details retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to fetch recipe details';
      res.status(status).json({ 
        success: false, 
        message: message 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }
});

export default router;

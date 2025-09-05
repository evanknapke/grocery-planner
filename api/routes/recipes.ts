import { Router } from 'express';
import axios from 'axios';
import { config } from '../config/index.js';

const router = Router();

// Recipe search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query, ...otherParams } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Build Spoonacular API URL
    const spoonacularParams = new URLSearchParams({
      apiKey: config.spoonacular.apiKey,
      query: query as string,
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      ...otherParams,
    });

    const spoonacularUrl = `${config.spoonacular.baseUrl}/recipes/complexSearch?${spoonacularParams.toString()}`;
    
    console.log('Proxying request to:', spoonacularUrl.replace(config.spoonacular.apiKey, '***'));

    const response = await axios.get(spoonacularUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching recipes:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to search recipes';
      res.status(status).json({ error: message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Recipe details endpoint
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'Valid recipe ID is required' });
    }

    // Build Spoonacular API URL
    const spoonacularParams = new URLSearchParams({
      apiKey: config.spoonacular.apiKey,
      includeNutrition: 'true',
    });

    const spoonacularUrl = `${config.spoonacular.baseUrl}/recipes/${id}/information?${spoonacularParams.toString()}`;
    
    console.log('Proxying request to:', spoonacularUrl.replace(config.spoonacular.apiKey, '***'));

    const response = await axios.get(spoonacularUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to fetch recipe details';
      res.status(status).json({ error: message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;

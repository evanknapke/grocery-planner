import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      query: query as string,
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
}

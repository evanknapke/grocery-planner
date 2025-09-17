import { VercelRequest, VercelResponse } from '@vercel/node';

// For now, this is a simple in-memory storage
// In production, you'd want to use a database
let groceryLists: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid grocery list ID is required'
      });
    }

    if (req.method === 'GET') {
      // Get a specific grocery list
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
    } else if (req.method === 'DELETE') {
      // Delete a grocery list
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
    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

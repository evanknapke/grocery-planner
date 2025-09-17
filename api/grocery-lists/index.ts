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
    if (req.method === 'GET') {
      // Get all grocery lists
      res.json({
        success: true,
        data: groceryLists,
        message: 'Grocery lists retrieved successfully'
      });
    } else if (req.method === 'POST') {
      // Create a new grocery list
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

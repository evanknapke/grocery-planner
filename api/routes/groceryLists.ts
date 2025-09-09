import { Router, Request, Response } from 'express';

const router = Router();

// In-memory storage for demo purposes
// In a real app, this would be a database
let savedLists: any[] = [];

// GET /api/grocery-lists - Get all saved grocery lists
router.get('/', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: savedLists,
      count: savedLists.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch grocery lists'
    });
  }
});

// POST /api/grocery-lists - Save a new grocery list
router.post('/', (req: Request, res: Response) => {
  try {
    const { items, name, savedAt } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    const newList = {
      id: `list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name || `Grocery List ${new Date().toLocaleDateString()}`,
      items,
      savedAt: savedAt || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    savedLists.push(newList);

    res.status(201).json({
      success: true,
      data: newList,
      message: 'Grocery list saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save grocery list'
    });
  }
});

// GET /api/grocery-lists/:id - Get a specific grocery list
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = savedLists.find(l => l.id === id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Grocery list not found'
      });
    }

    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch grocery list'
    });
  }
});

// DELETE /api/grocery-lists/:id - Delete a grocery list
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listIndex = savedLists.findIndex(l => l.id === id);

    if (listIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Grocery list not found'
      });
    }

    savedLists.splice(listIndex, 1);

    res.json({
      success: true,
      message: 'Grocery list deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete grocery list'
    });
  }
});

export default router;

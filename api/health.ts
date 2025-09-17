import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'grocery-planner-api'
  });
}

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ error: 'Internal server error' });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
};

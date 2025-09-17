import express from 'express';
import { config } from './config/index.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling middleware (must be after routes)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port);

export default app;

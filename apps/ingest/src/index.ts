import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { webhookRouter } from './routes/webhooks';
import { healthRouter } from './routes/health';

dotenv.config();

const app = express();
const CONVEX_URL = process.env.CONVEX_URL;

if (!CONVEX_URL) {
  console.error('ERROR: CONVEX_URL environment variable required');
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/webhooks', webhookRouter);
app.use('/health', healthRouter);

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'mea-clawpa-ingest',
    status: 'healthy',
    convex: CONVEX_URL ? 'configured' : 'missing'
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

// For Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🦀 Mea Clawpa Ingest Service`);
    console.log(`   Listening on port ${PORT}`);
    console.log(`   Convex URL: ${CONVEX_URL}`);
    console.log(`   Ready to receive confessions...`);
  });
}

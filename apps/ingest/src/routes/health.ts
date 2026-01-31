import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'mea-clawpa-ingest',
    timestamp: new Date().toISOString()
  });
});

export { router as healthRouter };

import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/alerts
router.get('/', (_req, res) => {
  const alerts = db.prepare('SELECT * FROM alerts WHERE active = 1 ORDER BY created_at DESC').all();
  res.json({ success: true, data: alerts });
});

export default router;

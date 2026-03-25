import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/mandi-prices
router.get('/', (_req, res) => {
  const prices = db.prepare('SELECT * FROM mandi_prices ORDER BY commodity').all();
  res.json({ success: true, data: prices });
});

export default router;

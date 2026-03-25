import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/schemes
router.get('/', (_req, res) => {
  const schemes = db.prepare('SELECT * FROM schemes ORDER BY id').all();
  res.json({ success: true, data: schemes });
});

export default router;

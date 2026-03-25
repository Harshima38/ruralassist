import { Router } from 'express';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET /api/issues — list all issues
router.get('/', (_req, res) => {
  const issues = db.prepare('SELECT * FROM issues ORDER BY created_at DESC').all();
  res.json({ success: true, data: issues });
});

// GET /api/issues/:id — single issue
router.get('/:id', (req, res) => {
  const issue = db.prepare('SELECT * FROM issues WHERE id = ?').get(req.params.id);
  if (!issue) return res.status(404).json({ success: false, error: 'Issue not found' });
  res.json({ success: true, data: issue });
});

// POST /api/issues — create new issue
router.post('/', (req, res) => {
  const { title, description, category, photo_url, latitude, longitude, village } = req.body;
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO issues (id, title, description, category, photo_url, latitude, longitude, village)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, title || category, description || '', category, photo_url || null, latitude || 25.1492, longitude || 73.5873, village || 'Kumbhalgarh North');
  
  const issue = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
  res.status(201).json({ success: true, data: issue, message: 'Issue submitted successfully!' });
});

// PATCH /api/issues/:id — update status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE issues SET status = ?, updated_at = datetime("now") WHERE id = ?').run(status, req.params.id);
  const issue = db.prepare('SELECT * FROM issues WHERE id = ?').get(req.params.id);
  res.json({ success: true, data: issue });
});

export default router;

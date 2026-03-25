import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/stats
router.get('/', (_req, res) => {
  const issueCount = (db.prepare('SELECT COUNT(*) as c FROM issues').get() as any).c;
  res.json({
    success: true,
    data: {
      activeRequests: 1482 + issueCount,
      fundsAllocated: '₹4.2 Cr',
      budgetUtilization: 74,
      healthScore: 82,
      serviceCompletion: 75,
      pensions: 92,
      landRecords: 64,
    },
  });
});

// GET /api/activity
router.get('/activity', (_req, res) => {
  const activity = db.prepare('SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10').all();
  res.json({ success: true, data: activity });
});

// GET /api/community
router.get('/community', (_req, res) => {
  const events = db.prepare('SELECT * FROM community_events ORDER BY created_at DESC').all();
  res.json({ success: true, data: events });
});

// GET /api/health-score
router.get('/health-score', (_req, res) => {
  res.json({
    success: true,
    data: {
      score: 82,
      status: 'Healthy',
      description: 'Village infra and livestock health is',
      highlight: 'Excellent',
      suffix: 'this week.',
    },
  });
});

export default router;

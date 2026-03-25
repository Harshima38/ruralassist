import { Router } from 'express';

const router = Router();

// GET /api/weather
router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      temperature: 32,
      condition: 'Partly Cloudy',
      humidity: 45,
      wind: 12,
      icon: 'partly_cloudy_day',
      forecast: [
        { day: 'Mon', temp: 33, icon: 'sunny' },
        { day: 'Tue', temp: 30, icon: 'rainy' },
        { day: 'Wed', temp: 28, icon: 'thunderstorm' },
        { day: 'Thu', temp: 31, icon: 'partly_cloudy_day' },
        { day: 'Fri', temp: 34, icon: 'sunny' },
      ],
    },
  });
});

export default router;

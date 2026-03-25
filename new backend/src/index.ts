import express from 'express';
import cors from 'cors';
import issuesRouter from './routes/issues';
import alertsRouter from './routes/alerts';
import weatherRouter from './routes/weather';
import schemesRouter from './routes/schemes';
import mandiRouter from './routes/mandi';
import voiceRouter from './routes/voice';
import statsRouter from './routes/stats';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'] }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', name: 'GramAI Backend', version: '1.0.0', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/issues', issuesRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/schemes', schemesRouter);
app.use('/api/mandi-prices', mandiRouter);
app.use('/api/voice', voiceRouter);
app.use('/api/stats', statsRouter);
app.use('/api/activity', statsRouter);
app.use('/api/community', statsRouter);
app.use('/api/health-score', statsRouter);

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   🌾 GramAI Backend Server Running      ║
║   📡 http://localhost:${PORT}               ║
║   🗃️  SQLite Database: gramai.db         ║
╚══════════════════════════════════════════╝
  `);
});

export default app;

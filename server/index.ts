import express from 'express';
import { assetRouter } from './modules/assets/assetRoutes.js';
import { timelineRouter } from './modules/timeline/controller.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json({ limit: '2mb' }));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'documentary-factory-api' });
});

app.use('/api/assets', assetRouter);
app.use('/api/timelines', timelineRouter);

app.listen(port, '127.0.0.1', () => {
  console.log(`Documentary Factory API listening on http://127.0.0.1:${port}`);
});

import express from 'express';

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'documentary-factory-api' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Documentary Factory API listening on http://127.0.0.1:${port}`);
});

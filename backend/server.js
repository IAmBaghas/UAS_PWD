import http from 'http';
import { handleRequest } from './routes.js';
import { initDb } from './db.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  handleRequest(req, res);
});

server.listen(PORT, async () => {
  await initDb();

  console.log(`================================================================`);
  console.log(`   Server is running at : http://localhost:${PORT}`);
  console.log(`================================================================`);
});

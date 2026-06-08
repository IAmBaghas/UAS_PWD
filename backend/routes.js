import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleArticleRoutes } from './route/article_route.js';
import { handleBannerRoutes } from './route/banner_route.js';
import { handleDepartmentRoutes } from './route/department_route.js';
import { handleUserRoutes } from './route/users_route.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');

/**
 * Send JSON response helper.
 */
export const jsonResponse = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
  return true;
};

/**
 * Read request body stream as JSON.
 */
export const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', err => reject(err));
  });
};

/**
 * Main HTTP route dispatcher.
 */
export const handleRequest = async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  try {
    // Delegate to modular sub-routers
    if (await handleUserRoutes(req, res, pathname, method, parsedUrl)) return;
    if (await handleBannerRoutes(req, res, pathname, method, parsedUrl)) return;
    if (await handleDepartmentRoutes(req, res, pathname, method, parsedUrl)) return;
    if (await handleArticleRoutes(req, res, pathname, method, parsedUrl)) return;

    // Serve static uploaded files
    if (pathname.startsWith('/uploads/') && method === 'GET') {
      const filename = pathname.replace('/uploads/', '');
      const filePath = path.join(UPLOADS_DIR, decodeURIComponent(filename));

      try {
        const fileContent = await fs.readFile(filePath);

        let ext = path.extname(filePath).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.svg') contentType = 'image/svg+xml';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
        return;
      } catch {
        return jsonResponse(res, 404, { status: 'error', message: 'Image not found' });
      }
    }

    // Serve static frontend files
    if (method === 'GET' && !pathname.startsWith('/api/')) {
      let relativePath = pathname;
      if (relativePath === '/' || relativePath === '') {
        relativePath = '/index.html';
      }
      if (relativePath.startsWith('/frontend/')) {
        relativePath = relativePath.replace('/frontend/', '/');
      }

      const filePath = path.join(__dirname, '..', 'frontend', decodeURIComponent(relativePath));

      try {
        const fileContent = await fs.readFile(filePath);

        let ext = path.extname(filePath).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.html') contentType = 'text/html';
        else if (ext === '.js') contentType = 'application/javascript';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.svg') contentType = 'image/svg+xml';
        else if (ext === '.ico') contentType = 'image/x-icon';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
        return;
      } catch {
        // Fall through to 404 if file not found
      }
    }

    // Health check endpoint
    if (pathname === '/api/health' && method === 'GET') {
      return jsonResponse(res, 200, {
        status: 'success',
        message: 'Native JSON-DB Server is fully online and persistent!',
        timestamp: new Date().toISOString()
      });
    }

    // Fallback: 404
    return jsonResponse(res, 404, { status: 'error', message: `Endpoint '${method} ${pathname}' not found` });

  } catch (error) {
    console.error(`API Error handling ${method} ${pathname}:`, error);
    return jsonResponse(res, 500, { status: 'error', message: error.message });
  }
};

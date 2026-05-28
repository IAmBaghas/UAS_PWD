import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { readDb, writeDb } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');

/**
 * Send JSON response helper.
 */
export const jsonResponse = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
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

    if (pathname === '/api/health' && method === 'GET') {
      return jsonResponse(res, 200, {
        status: 'success',
        message: 'Native JSON-DB Server is fully online and persistent!',
        timestamp: new Date().toISOString()
      });
    }

    if (pathname === '/api/items' && method === 'GET') {
      const db = await readDb();
      const itemId = parsedUrl.searchParams.get('id');

      if (itemId) {
        const item = db.items.find(i => i.id === itemId);
        if (!item) return jsonResponse(res, 404, { status: 'error', message: 'Item not found' });
        return jsonResponse(res, 200, { status: 'success', data: item });
      }

      return jsonResponse(res, 200, { status: 'success', data: db.items });
    }

    if (pathname === '/api/items' && method === 'POST') {
      const db = await readDb();
      const body = await getRequestBody(req);

      const { name, category, rate, description, imageName, imageData } = body;

      if (!name || !category || !rate) {
        return jsonResponse(res, 400, { status: 'error', message: 'Name, category, and rate are required' });
      }

      let imagePath = 'uploads/default_item.jpg';

      if (imageName && imageData) {
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.writeFile(savePath, base64Data, 'base64');
        imagePath = `uploads/${uniqueFileName}`;
      }

      const newItem = {
        id: `item_${Date.now()}`,
        name,
        category,
        status: 'Available',
        rate: Number(rate),
        image: imagePath,
        description: description || ''
      };

      db.items.push(newItem);
      await writeDb(db);

      return jsonResponse(res, 201, { status: 'success', data: newItem, message: 'Item created successfully!' });
    }

    // API: PUT /api/items (Update / Edit Item)
    if (pathname === '/api/items' && method === 'PUT') {
      const db = await readDb();
      const body = await getRequestBody(req);
      const itemId = parsedUrl.searchParams.get('id');

      if (!itemId) return jsonResponse(res, 400, { status: 'error', message: 'Item ID is required' });

      const index = db.items.findIndex(i => i.id === itemId);
      if (index === -1) return jsonResponse(res, 404, { status: 'error', message: 'Item not found' });

      const currentItem = db.items[index];
      const { name, category, rate, description, imageName, imageData, status } = body;

      let imagePath = currentItem.image;

      if (imageName && imageData) {
        if (currentItem.image && currentItem.image !== 'uploads/default_item.jpg') {
          try {
            await fs.unlink(path.join(__dirname, currentItem.image));
          } catch (e) {
            // Ignore error if file doesn't exist
          }
        }

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.writeFile(savePath, base64Data, 'base64');
        imagePath = `uploads/${uniqueFileName}`;
      }

      db.items[index] = {
        ...currentItem,
        name: name || currentItem.name,
        category: category || currentItem.category,
        rate: rate ? Number(rate) : currentItem.rate,
        description: description !== undefined ? description : currentItem.description,
        status: status || currentItem.status,
        image: imagePath
      };

      await writeDb(db);
      return jsonResponse(res, 200, { status: 'success', data: db.items[index], message: 'Item updated successfully!' });
    }

    // API: DELETE /api/items (Delete Item CRUD)
    if (pathname === '/api/items' && method === 'DELETE') {
      const db = await readDb();
      const itemId = parsedUrl.searchParams.get('id');

      if (!itemId) return jsonResponse(res, 400, { status: 'error', message: 'Item ID is required' });

      const item = db.items.find(i => i.id === itemId);
      if (!item) return jsonResponse(res, 404, { status: 'error', message: 'Item not found' });

      if (item.image && item.image !== 'uploads/default_item.jpg') {
        try {
          await fs.unlink(path.join(__dirname, item.image));
        } catch (e) {
          // File may already be deleted
        }
      }

      db.items = db.items.filter(i => i.id !== itemId);
      db.rentals = db.rentals.filter(r => r.itemId !== itemId);
      await writeDb(db);

      return jsonResponse(res, 200, { status: 'success', message: 'Item and its rentals deleted successfully!' });
    }

    // API: GET /api/rentals (Read Rentals)
    if (pathname === '/api/rentals' && method === 'GET') {
      const db = await readDb();
      return jsonResponse(res, 200, { status: 'success', data: db.rentals });
    }

    // API: POST /api/rentals (Rent Gear / Create Transaction)
    if (pathname === '/api/rentals' && method === 'POST') {
      const db = await readDb();
      const body = await getRequestBody(req);

      const { itemId, renterName, durationDays } = body;

      if (!itemId || !renterName || !durationDays) {
        return jsonResponse(res, 400, { status: 'error', message: 'itemId, renterName, and durationDays are required' });
      }

      const itemIndex = db.items.findIndex(i => i.id === itemId);
      if (itemIndex === -1) return jsonResponse(res, 404, { status: 'error', message: 'Item not found' });

      const item = db.items[itemIndex];
      if (item.status !== 'Available') {
        return jsonResponse(res, 400, { status: 'error', message: 'Item is already rented or unavailable' });
      }

      const rentalId = `rent_${Date.now()}`;
      const totalCost = item.rate * Number(durationDays);
      const newRental = {
        id: rentalId,
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
        renterName,
        durationDays: Number(durationDays),
        totalCost,
        startDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };

      db.items[itemIndex].status = 'Rented';
      db.rentals.push(newRental);
      await writeDb(db);

      return jsonResponse(res, 201, { status: 'success', data: newRental, message: `Successfully rented ${item.name}!` });
    }

    // API: PUT /api/rentals/return (Return Gear)
    if (pathname === '/api/rentals/return' && method === 'PUT') {
      const db = await readDb();
      const body = await getRequestBody(req);
      const { rentalId } = body;

      if (!rentalId) return jsonResponse(res, 400, { status: 'error', message: 'rentalId is required' });

      const rentalIndex = db.rentals.findIndex(r => r.id === rentalId);
      if (rentalIndex === -1) return jsonResponse(res, 404, { status: 'error', message: 'Rental transaction not found' });

      const rental = db.rentals[rentalIndex];
      if (rental.status !== 'Active') {
        return jsonResponse(res, 400, { status: 'error', message: 'Rental is already returned' });
      }

      const itemIndex = db.items.findIndex(i => i.id === rental.itemId);
      if (itemIndex !== -1) {
        db.items[itemIndex].status = 'Available';
      }

      db.rentals[rentalIndex].status = 'Returned';
      db.rentals[rentalIndex].returnDate = new Date().toISOString().split('T')[0];

      await writeDb(db);
      return jsonResponse(res, 200, { status: 'success', message: 'Item returned successfully!' });
    }

    // Fallback: 404
    return jsonResponse(res, 404, { status: 'error', message: `Endpoint '${method} ${pathname}' not found` });

  } catch (error) {
    console.error(`API Error handling ${method} ${pathname}:`, error);
    return jsonResponse(res, 500, { status: 'error', message: error.message });
  }
};

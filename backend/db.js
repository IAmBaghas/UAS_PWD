import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_DIR = path.join(__dirname, 'db');

/**
 * Initialize uploads directory and JSON database directory if they do not exist.
 */
export const initDb = async () => {
  // Ensure the uploads directory exists for storing media
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    console.log('Local uploads directory created successfully at backend/uploads/');
  }

  // Ensure the database directory exists
  try {
    await fs.access(DB_DIR);
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true });
    console.log('Local db directory created successfully at backend/db/');
  }
};

export default {
  initDb
};

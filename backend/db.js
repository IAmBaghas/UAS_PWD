import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

/**
 * Initialize local folders and database file if they do not exist.
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
    console.log('Local data directory created successfully at backend/data/');
  }

  // Ensure the data.json database file exists
  try {
    await fs.access(DB_FILE);
  } catch {
    const defaultData = {
      items: [
        {
          id: "item_1",
          name: "Sony Alpha 7 IV Mirrorless Camera",
          category: "Camera",
          status: "Available",
          rate: 150000,
          image: "uploads/sony_a7.jpg",
          description: "High-resolution full-frame hybrid mirrorless camera."
        },
        {
          id: "item_2",
          name: "MacBook Pro M3 Max 16-inch",
          category: "Laptop",
          status: "Available",
          rate: 450000,
          image: "uploads/macbook_pro.jpg",
          description: "Ultimate high-performance mobile workstation for creators."
        },
        {
          id: "item_3",
          name: "PlayStation 5 Slim Console",
          category: "Console",
          status: "Available",
          rate: 80000,
          image: "uploads/ps5.jpg",
          description: "Stunning next-gen gaming console with ultra-high-speed SSD."
        }
      ],
      users: [
        {
          id: "usr_admin",
          name: "Baghas (Admin)",
          role: "admin"
        },
        {
          id: "usr_member",
          name: "Partner (Member)",
          role: "member"
        }
      ],
      rentals: []
    };
    await fs.writeFile(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    console.log('Local JSON database initialized at backend/data/data.json with sample data!');
  }
};

/**
 * Read the database contents from the data/data.json file.
 */
export const readDb = async () => {
  await initDb();
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

/**
 * Write the updated database back to the data/data.json file.
 */
export const writeDb = async (data) => {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

export default {
  initDb,
  readDb,
  writeDb
};

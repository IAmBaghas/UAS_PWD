import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, '..', 'db', 'users.json');

// Helper to encrypt passwords using SHA-256
export const hashPassword = (password) => {
  if (!password) return '';
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Ensure database file exists
const initFile = async () => {
  try {
    await fs.access(FILE_PATH);
  } catch {
    // If not exists, initialize with a default admin user with encrypted password
    const defaultAdmin = [
      {
        id: "usr_admin",
        username: "admin",
        password: hashPassword("admin123"),
        name: "Administrator",
        email: "admin@example.com",
        role: "admin",
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    await fs.writeFile(FILE_PATH, JSON.stringify(defaultAdmin, null, 2), 'utf-8');
  }
};

export const getAll = async () => {
  await initFile();
  const data = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(data || '[]');
};

export const getById = async (id) => {
  const all = await getAll();
  return all.find(item => item.id === id);
};

export const getByUsername = async (username) => {
  const all = await getAll();
  return all.find(item => item.username.toLowerCase() === username.toLowerCase());
};

export const create = async (user) => {
  const all = await getAll();
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    username: user.username || '',
    password: hashPassword(user.password),
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'member',
    status: user.status || 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  all.push(newUser);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return newUser;
};

export const update = async (id, updates) => {
  const all = await getAll();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;

  const finalPassword = updates.password ? hashPassword(updates.password) : all[index].password;

  all[index] = {
    ...all[index],
    ...updates,
    password: finalPassword,
    updatedAt: new Date().toISOString()
  };
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return all[index];
};

export const remove = async (id) => {
  const all = await getAll();
  const filtered = all.filter(item => item.id !== id);
  if (all.length === filtered.length) return false;
  await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
};

export default {
  getAll,
  getById,
  getByUsername,
  create,
  update,
  remove,
  hashPassword
};

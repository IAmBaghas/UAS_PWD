import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, '..', 'db', 'banner.json');

const initFile = async () => {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
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

export const create = async (banner) => {
  const all = await getAll();
  const newBanner = {
    id: `banner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: banner.title || '',
    subtitle: banner.subtitle || '',
    imageUrl: banner.imageUrl || '',
    linkUrl: banner.linkUrl || '',
    order: Number(banner.order) || (all.length + 1),
    isActive: banner.isActive !== undefined ? banner.isActive : true,
    createdAt: new Date().toISOString()
  };
  all.push(newBanner);
  all.sort((a, b) => a.order - b.order);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return newBanner;
};

export const update = async (id, updates) => {
  const all = await getAll();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    ...updates,
    order: updates.order !== undefined ? Number(updates.order) : all[index].order
  };
  all.sort((a, b) => a.order - b.order);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return all.find(item => item.id === id);
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
  create,
  update,
  remove
};

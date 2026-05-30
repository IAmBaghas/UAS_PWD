import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, '..', 'db', 'article.json');

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

export const getBySlug = async (slug) => {
  const all = await getAll();
  return all.find(item => item.slug === slug);
};

export const create = async (article) => {
  const all = await getAll();
  
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const title = article.title || 'Untitled Article';
  const slug = article.slug || slugify(title);

  const newArticle = {
    id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title,
    slug,
    type: article.type || 'General',
    thumbnail: article.thumbnail || '',
    date: article.date || new Date().toISOString().split('T')[0],
    summary: article.summary || '',
    content: article.content || '',
    author: article.author || 'Admin',
    views: Number(article.views) || 0,
    status: article.status || 'Draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  all.push(newArticle);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return newArticle;
};

export const update = async (id, updates) => {
  const all = await getAll();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;

  let slug = all[index].slug;
  if (updates.title && !updates.slug) {
    const slugify = (text) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    };
    slug = slugify(updates.title);
  } else if (updates.slug) {
    slug = updates.slug;
  }

  all[index] = {
    ...all[index],
    ...updates,
    slug,
    views: updates.views !== undefined ? Number(updates.views) : all[index].views,
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

export const incrementViews = async (id) => {
  const all = await getAll();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;

  all[index].views = (all[index].views || 0) + 1;
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return all[index];
};

export default {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  remove,
  incrementViews
};

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, '..', 'db', 'department.json');

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

export const create = async (department) => {
  const all = await getAll();
  const newDept = {
    id: `dept_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    image_url: department.image_url || '',
    department_name: department.department_name || '',
    department_study_program: Array.isArray(department.department_study_program) 
      ? department.department_study_program 
      : []
  };
  all.push(newDept);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf-8');
  return newDept;
};

export const update = async (id, updates) => {
  const all = await getAll();
  const index = all.findIndex(item => item.id === id);
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    ...updates,
    department_study_program: updates.department_study_program !== undefined
      ? (Array.isArray(updates.department_study_program) ? updates.department_study_program : [])
      : all[index].department_study_program
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
  create,
  update,
  remove
};

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRequestBody, jsonResponse } from '../routes.js';
import DepartmentModel from '../model/department_model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

export const handleDepartmentRoutes = async (req, res, pathname, method, parsedUrl) => {
  try {
    // GET /api/departments
    if (pathname === '/api/departments' && method === 'GET') {
      const id = parsedUrl.searchParams.get('id');
      if (id) {
        const dept = await DepartmentModel.getById(id);
        if (!dept) return jsonResponse(res, 404, { status: 'error', message: 'Department not found' });
        return jsonResponse(res, 200, { status: 'success', data: dept });
      }

      const depts = await DepartmentModel.getAll();
      return jsonResponse(res, 200, { status: 'success', data: depts });
    }

    // POST /api/departments
    if (pathname === '/api/departments' && method === 'POST') {
      const body = await getRequestBody(req);
      const { department_name, department_study_program, imageName, imageData } = body;

      if (!department_name) {
        return jsonResponse(res, 400, { status: 'error', message: 'Department name is required' });
      }

      let image_url = 'uploads/default_dept.png';

      if (imageName && imageData) {
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.png';
        const uniqueFileName = `dept_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        image_url = `uploads/${uniqueFileName}`;
      }

      const newDept = await DepartmentModel.create({
        department_name,
        department_study_program,
        image_url
      });

      return jsonResponse(res, 201, { status: 'success', data: newDept, message: 'Department created successfully' });
    }

    // PUT /api/departments
    if (pathname === '/api/departments' && method === 'PUT') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Department ID is required' });

      const currentDept = await DepartmentModel.getById(id);
      if (!currentDept) return jsonResponse(res, 404, { status: 'error', message: 'Department not found' });

      const body = await getRequestBody(req);
      const { department_name, department_study_program, imageName, imageData } = body;

      let image_url = currentDept.image_url;

      if (imageName && imageData) {
        if (currentDept.image_url && currentDept.image_url !== 'uploads/default_dept.png') {
          try {
            await fs.unlink(path.join(__dirname, '..', currentDept.image_url));
          } catch (e) {
            // Ignore
          }
        }

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.png';
        const uniqueFileName = `dept_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        image_url = `uploads/${uniqueFileName}`;
      }

      const updatedDept = await DepartmentModel.update(id, {
        department_name,
        department_study_program,
        image_url
      });

      return jsonResponse(res, 200, { status: 'success', data: updatedDept, message: 'Department updated successfully' });
    }

    // DELETE /api/departments
    if (pathname === '/api/departments' && method === 'DELETE') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Department ID is required' });

      const dept = await DepartmentModel.getById(id);
      if (!dept) return jsonResponse(res, 404, { status: 'error', message: 'Department not found' });

      if (dept.image_url && dept.image_url !== 'uploads/default_dept.png') {
        try {
          await fs.unlink(path.join(__dirname, '..', dept.image_url));
        } catch (e) {
          // Ignore
        }
      }

      await DepartmentModel.remove(id);
      return jsonResponse(res, 200, { status: 'success', message: 'Department deleted successfully' });
    }

    return false;
  } catch (error) {
    console.error('Department routes error:', error);
    jsonResponse(res, 500, { status: 'error', message: error.message });
    return true;
  }
};

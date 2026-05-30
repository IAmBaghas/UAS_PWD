import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRequestBody, jsonResponse } from '../routes.js';
import BannerModel from '../model/banner_model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

export const handleBannerRoutes = async (req, res, pathname, method, parsedUrl) => {
  try {
    // GET /api/banners
    if (pathname === '/api/banners' && method === 'GET') {
      const id = parsedUrl.searchParams.get('id');
      if (id) {
        const banner = await BannerModel.getById(id);
        if (!banner) return jsonResponse(res, 404, { status: 'error', message: 'Banner not found' });
        return jsonResponse(res, 200, { status: 'success', data: banner });
      }

      const banners = await BannerModel.getAll();
      return jsonResponse(res, 200, { status: 'success', data: banners });
    }

    // POST /api/banners
    if (pathname === '/api/banners' && method === 'POST') {
      const body = await getRequestBody(req);
      const { title, subtitle, linkUrl, order, isActive, imageName, imageData } = body;

      let imageUrl = 'uploads/default_banner.jpg';

      if (imageName && imageData) {
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `banner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        imageUrl = `uploads/${uniqueFileName}`;
      }

      const newBanner = await BannerModel.create({
        title,
        subtitle,
        imageUrl,
        linkUrl,
        order,
        isActive
      });

      return jsonResponse(res, 201, { status: 'success', data: newBanner, message: 'Banner created successfully' });
    }

    // PUT /api/banners
    if (pathname === '/api/banners' && method === 'PUT') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Banner ID is required' });

      const currentBanner = await BannerModel.getById(id);
      if (!currentBanner) return jsonResponse(res, 404, { status: 'error', message: 'Banner not found' });

      const body = await getRequestBody(req);
      const { title, subtitle, linkUrl, order, isActive, imageName, imageData } = body;

      let imageUrl = currentBanner.imageUrl;

      if (imageName && imageData) {
        if (currentBanner.imageUrl && currentBanner.imageUrl !== 'uploads/default_banner.jpg') {
          try {
            await fs.unlink(path.join(__dirname, '..', currentBanner.imageUrl));
          } catch (e) {
            // Ignore
          }
        }

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `banner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        imageUrl = `uploads/${uniqueFileName}`;
      }

      const updatedBanner = await BannerModel.update(id, {
        title,
        subtitle,
        imageUrl,
        linkUrl,
        order,
        isActive
      });

      return jsonResponse(res, 200, { status: 'success', data: updatedBanner, message: 'Banner updated successfully' });
    }

    // DELETE /api/banners
    if (pathname === '/api/banners' && method === 'DELETE') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Banner ID is required' });

      const banner = await BannerModel.getById(id);
      if (!banner) return jsonResponse(res, 404, { status: 'error', message: 'Banner not found' });

      if (banner.imageUrl && banner.imageUrl !== 'uploads/default_banner.jpg') {
        try {
          await fs.unlink(path.join(__dirname, '..', banner.imageUrl));
        } catch (e) {
          // Ignore
        }
      }

      await BannerModel.remove(id);
      return jsonResponse(res, 200, { status: 'success', message: 'Banner deleted successfully' });
    }

    return false;
  } catch (error) {
    console.error('Banner routes error:', error);
    jsonResponse(res, 500, { status: 'error', message: error.message });
    return true;
  }
};

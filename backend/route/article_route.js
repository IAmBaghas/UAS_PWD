import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRequestBody, jsonResponse } from '../routes.js';
import ArticleModel from '../model/article_model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

export const handleArticleRoutes = async (req, res, pathname, method, parsedUrl) => {
  try {
    // GET /api/articles
    if (pathname === '/api/articles' && method === 'GET') {
      const id = parsedUrl.searchParams.get('id');
      const slug = parsedUrl.searchParams.get('slug');

      if (id) {
        const article = await ArticleModel.getById(id);
        if (!article) return jsonResponse(res, 404, { status: 'error', message: 'Article not found' });
        return jsonResponse(res, 200, { status: 'success', data: article });
      }

      if (slug) {
        const article = await ArticleModel.getBySlug(slug);
        if (!article) return jsonResponse(res, 404, { status: 'error', message: 'Article not found' });
        return jsonResponse(res, 200, { status: 'success', data: article });
      }

      const articles = await ArticleModel.getAll();
      return jsonResponse(res, 200, { status: 'success', data: articles });
    }

    // POST /api/articles
    if (pathname === '/api/articles' && method === 'POST') {
      const body = await getRequestBody(req);
      const { title, type, date, summary, content, author, status, imageName, imageData } = body;

      if (!title) {
        return jsonResponse(res, 400, { status: 'error', message: 'Article title is required' });
      }

      let thumbnail = 'uploads/default_article.jpg';

      if (imageName && imageData) {
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `article_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        thumbnail = `uploads/${uniqueFileName}`;
      }

      const newArticle = await ArticleModel.create({
        title,
        type,
        date,
        summary,
        content,
        author,
        status,
        thumbnail
      });

      return jsonResponse(res, 201, { status: 'success', data: newArticle, message: 'Article created successfully' });
    }

    // PUT /api/articles
    if (pathname === '/api/articles' && method === 'PUT') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Article ID is required' });

      const currentArticle = await ArticleModel.getById(id);
      if (!currentArticle) return jsonResponse(res, 404, { status: 'error', message: 'Article not found' });

      const body = await getRequestBody(req);
      const { title, type, date, summary, content, author, status, views, imageName, imageData } = body;

      let thumbnail = currentArticle.thumbnail;

      if (imageName && imageData) {
        if (currentArticle.thumbnail && currentArticle.thumbnail !== 'uploads/default_article.jpg') {
          try {
            await fs.unlink(path.join(__dirname, '..', currentArticle.thumbnail));
          } catch (e) {
            // Ignore
          }
        }

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const fileExt = path.extname(imageName) || '.jpg';
        const uniqueFileName = `article_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
        const savePath = path.join(UPLOADS_DIR, uniqueFileName);

        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        await fs.writeFile(savePath, base64Data, 'base64');
        thumbnail = `uploads/${uniqueFileName}`;
      }

      const updatedArticle = await ArticleModel.update(id, {
        title,
        type,
        date,
        summary,
        content,
        author,
        status,
        views,
        thumbnail
      });

      return jsonResponse(res, 200, { status: 'success', data: updatedArticle, message: 'Article updated successfully' });
    }

    // POST /api/articles/view (Increment views)
    if (pathname === '/api/articles/view' && method === 'POST') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Article ID is required' });

      const article = await ArticleModel.incrementViews(id);
      if (!article) return jsonResponse(res, 404, { status: 'error', message: 'Article not found' });

      return jsonResponse(res, 200, { status: 'success', data: article, message: 'View incremented' });
    }

    // DELETE /api/articles
    if (pathname === '/api/articles' && method === 'DELETE') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'Article ID is required' });

      const article = await ArticleModel.getById(id);
      if (!article) return jsonResponse(res, 404, { status: 'error', message: 'Article not found' });

      if (article.thumbnail && article.thumbnail !== 'uploads/default_article.jpg') {
        try {
          await fs.unlink(path.join(__dirname, '..', article.thumbnail));
        } catch (e) {
          // Ignore
        }
      }

      await ArticleModel.remove(id);
      return jsonResponse(res, 200, { status: 'success', message: 'Article deleted successfully' });
    }

    return false;
  } catch (error) {
    console.error('Article routes error:', error);
    jsonResponse(res, 500, { status: 'error', message: error.message });
    return true;
  }
};

import { getRequestBody, jsonResponse } from '../routes.js';
import UsersModel from '../model/users_model.js';

export const handleUserRoutes = async (req, res, pathname, method, parsedUrl) => {
  try {
    // POST /api/users/login (Authenticate user)
    if (pathname === '/api/users/login' && method === 'POST') {
      const body = await getRequestBody(req);
      const { username, password } = body;

      if (!username || !password) {
        return jsonResponse(res, 400, { status: 'error', message: 'Username and password are required' });
      }

      const user = await UsersModel.getByUsername(username);
      // Hash the input password and compare with the stored SHA-256 hash
      const hashedInputPassword = UsersModel.hashPassword(password);

      if (!user || user.password !== hashedInputPassword) {
        return jsonResponse(res, 401, { status: 'error', message: 'Invalid username or password' });
      }

      const { password: _, ...userWithoutPassword } = user;
      return jsonResponse(res, 200, { status: 'success', data: userWithoutPassword, message: 'Login successful' });
    }

    // GET /api/users (Get all users or single user)
    if (pathname === '/api/users' && method === 'GET') {
      const id = parsedUrl.searchParams.get('id');
      if (id) {
        const user = await UsersModel.getById(id);
        if (!user) return jsonResponse(res, 404, { status: 'error', message: 'User not found' });
        const { password: _, ...userWithoutPassword } = user;
        return jsonResponse(res, 200, { status: 'success', data: userWithoutPassword });
      }

      const users = await UsersModel.getAll();
      const safeUsers = users.map(({ password: _, ...u }) => u);
      return jsonResponse(res, 200, { status: 'success', data: safeUsers });
    }

    // POST /api/users (Create a new user)
    if (pathname === '/api/users' && method === 'POST') {
      const body = await getRequestBody(req);
      const { username, password, name, email, role } = body;

      if (!username || !password) {
        return jsonResponse(res, 400, { status: 'error', message: 'Username and password are required' });
      }

      const existing = await UsersModel.getByUsername(username);
      if (existing) {
        return jsonResponse(res, 400, { status: 'error', message: 'Username already exists' });
      }

      const newUser = await UsersModel.create({ username, password, name, email, role });
      const { password: _, ...safeUser } = newUser;
      return jsonResponse(res, 201, { status: 'success', data: safeUser, message: 'User created successfully' });
    }

    // PUT /api/users
    if (pathname === '/api/users' && method === 'PUT') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'User ID is required' });

      const body = await getRequestBody(req);
      const updatedUser = await UsersModel.update(id, body);
      if (!updatedUser) return jsonResponse(res, 404, { status: 'error', message: 'User not found' });

      const { password: _, ...safeUser } = updatedUser;
      return jsonResponse(res, 200, { status: 'success', data: safeUser, message: 'User updated successfully' });
    }

    // DELETE /api/users
    if (pathname === '/api/users' && method === 'DELETE') {
      const id = parsedUrl.searchParams.get('id');
      if (!id) return jsonResponse(res, 400, { status: 'error', message: 'User ID is required' });

      const success = await UsersModel.remove(id);
      if (!success) return jsonResponse(res, 404, { status: 'error', message: 'User not found' });

      return jsonResponse(res, 200, { status: 'success', message: 'User deleted successfully' });
    }

    return false;
  } catch (error) {
    console.error('User routes error:', error);
    jsonResponse(res, 500, { status: 'error', message: error.message });
    return true;
  }
};

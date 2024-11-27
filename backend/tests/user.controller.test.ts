import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import router from '../src/routes/user.routes';
import userService from '../src/services/user.service'; // Mocké

jest.mock('../src/services/user.service'); // Mock le service utilisateur

const app = express();
app.use(express.json());
app.use(router);

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  describe('POST /', () => {
    it('should create a user successfully and return 201', async () => {
      const mockUser = { pseudo: 'JohnDoe', mail: 'john.doe@example.com', todoLists: [] };
      (userService.createUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).post('/').send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 when an error occurs in the service', async () => {
      (userService.createUser as jest.Mock).mockRejectedValue(new Error('Internal Service Error'));

      const response = await request(app).post('/').send({ pseudo: 'Error', mail: 'error@example.com' });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /:id', () => {
    it('should return a user if found', async () => {
      const mockUser = { _id: '123', pseudo: 'JohnDoe', mail: 'john.doe@example.com', todoLists: [] };
      (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith('123');
    });

    it('should return 404 if user is not found', async () => {
      (userService.getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('GET /:userId/todoLists', () => {
    it('should return todoLists of the user', async () => {
      const mockUser = { _id: '123', pseudo: 'JohnDoe', mail: 'john.doe@example.com', todoLists: ['todo1', 'todo2'] };
      (userService.getTodoListsByUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/123/todoLists');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(['todo1', 'todo2']);
      expect(userService.getTodoListsByUser).toHaveBeenCalledWith('123');
    });

    it('should return 404 if user is not found', async () => {
      (userService.getTodoListsByUser as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/123/todoLists');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('PUT /:id', () => {
    it('should update a user and return 200', async () => {
      const mockUpdatedUser = { _id: '123', pseudo: 'UpdatedName', mail: 'updated@example.com', todoLists: [] };
      (userService.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const response = await request(app).put('/123').send({ pseudo: 'UpdatedName' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedUser);
      expect(userService.updateUser).toHaveBeenCalledWith('123', { pseudo: 'UpdatedName' });
    });

    it('should return 404 if user to update is not found', async () => {
      (userService.updateUser as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/123').send({ pseudo: 'UpdatedName' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should return 400 if provided ID is invalid', async () => {
      const response = await request(app).put('/invalidID').send({ pseudo: 'UpdatedName' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid User ID' });
    });
  });
});

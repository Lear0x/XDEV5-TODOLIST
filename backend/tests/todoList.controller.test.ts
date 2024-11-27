import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import router from '../src/routes/todoList.routes';
import todoListService from '../src/services/todoList.service'; // Mocké

jest.mock('../src/services/todoList.service'); // Mock le service todoList

const app = express();
app.use(express.json());
app.use(router);

describe('TodoList Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  describe('POST /', () => {
    it('should create a todoList successfully and return 201', async () => {
      const mockTodoList = { label: 'Shopping', todoItems: [] };
      (todoListService.createTodoList as jest.Mock).mockResolvedValue(mockTodoList);

      const response = await request(app).post('/').send(mockTodoList);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTodoList);
      expect(todoListService.createTodoList).toHaveBeenCalledWith(mockTodoList);
    });

    it('should return 500 when an error occurs in the service', async () => {
      (todoListService.createTodoList as jest.Mock).mockRejectedValue(new Error('Internal Service Error'));

      const response = await request(app).post('/').send({ label: 'Error' });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /:id', () => {
    it('should return a todoList if found', async () => {
      const mockTodoList = { _id: '123', label: 'Shopping', todoItems: [] };
      (todoListService.getTodoListById as jest.Mock).mockResolvedValue(mockTodoList);

      const response = await request(app).get('/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodoList);
      expect(todoListService.getTodoListById).toHaveBeenCalledWith('123');
    });

    it('should return 404 if todoList is not found', async () => {
      (todoListService.getTodoListById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoList not found' });
    });
  });

  describe('GET /', () => {
    it('should return all todoLists', async () => {
      const mockTodoLists = [
        { _id: '123', label: 'Shopping', todoItems: [] },
        { _id: '124', label: 'Work', todoItems: [] }
      ];
      (todoListService.getAllTodoLists as jest.Mock).mockResolvedValue(mockTodoLists);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodoLists);
      expect(todoListService.getAllTodoLists).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:id', () => {
    it('should update a todoList and return 200', async () => {
      const mockUpdatedTodoList = { _id: '123', label: 'Updated Label', todoItems: [] };
      (todoListService.updateTodoList as jest.Mock).mockResolvedValue(mockUpdatedTodoList);

      const response = await request(app).put('/123').send({ label: 'Updated Label' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedTodoList);
      expect(todoListService.updateTodoList).toHaveBeenCalledWith('123', { label: 'Updated Label' });
    });

    it('should return 404 if todoList to update is not found', async () => {
      (todoListService.updateTodoList as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/123').send({ label: 'Updated Label' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoList not found' });
    });

    it('should return 400 if provided ID is invalid', async () => {
      const response = await request(app).put('/invalidID').send({ label: 'Updated Label' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid ID format' });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a todoList and return 204', async () => {
      (todoListService.deleteTodoList as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete('/123');

      expect(response.status).toBe(204);
      expect(todoListService.deleteTodoList).toHaveBeenCalledWith('123');
    });

    it('should return 404 if todoList to delete is not found', async () => {
      (todoListService.deleteTodoList as jest.Mock).mockResolvedValue(false);

      const response = await request(app).delete('/123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoList not found' });
    });
  });
});

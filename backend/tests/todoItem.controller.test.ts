import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import router from '../src/routes/todoItem.routes';
import todoItemService from '../src/services/todoItem.service'; // Mocké

jest.mock('../src/services/todoItem.service'); // Mock le service todoItem

const app = express();
app.use(express.json());
app.use(router);

describe('TodoItem Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  describe('POST /', () => {
    it('should create a todoItem successfully and return 201', async () => {
      const mockTodoItem = {
        assignedTo: 'user6746e98f902ee6efcbe583eb',
        label: 'Task 1',
        description: 'Description of Task 1',
        priority: 1,
        tag: ['tag1'],
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        state: 'To do',
      };
      (todoItemService.createTodoItem as jest.Mock).mockResolvedValue(mockTodoItem);

      const response = await request(app).post('/').send(mockTodoItem);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTodoItem);
      expect(todoItemService.createTodoItem).toHaveBeenCalledWith(mockTodoItem);
    });

    it('should return 500 when an error occurs in the service', async () => {
      (todoItemService.createTodoItem as jest.Mock).mockRejectedValue(new Error('Internal Service Error'));

      const response = await request(app).post('/').send({ label: 'Error' });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /:id', () => {
    it('should return a todoItem if found', async () => {
      const mockTodoItem = {
        _id: '6746e98f902ee6efcbe583eb',
        assignedTo: 'user6746e98f902ee6efcbe583eb',
        label: 'Task 1',
        description: 'Description of Task 1',
        priority: 1,
        tag: ['tag1'],
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        state: 'To do',
      };
      (todoItemService.getTodoItemById as jest.Mock).mockResolvedValue(mockTodoItem);

      const response = await request(app).get('/6746e98f902ee6efcbe583eb');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodoItem);
      expect(todoItemService.getTodoItemById).toHaveBeenCalledWith('6746e98f902ee6efcbe583eb');
    });

    it('should return 404 if todoItem is not found', async () => {
      (todoItemService.getTodoItemById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/6746e98f902ee6efcbe583eb');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoItem not found' });
    });
  });

  describe('PUT /:id', () => {
    it('should update a todoItem and return 200', async () => {
      const mockUpdatedTodoItem = {
        _id: '6746e98f902ee6efcbe583eb',
        assignedTo: 'user6746e98f902ee6efcbe583eb',
        label: 'Updated Task',
        description: 'Updated Description',
        priority: 2,
        tag: ['tag2'],
        startDate: '2024-01-01',
        endDate: '2024-01-03',
        state: 'Pending',
      };
      (todoItemService.updateTodoItem as jest.Mock).mockResolvedValue(mockUpdatedTodoItem);

      const response = await request(app).put('/6746e98f902ee6efcbe583eb').send({ label: 'Updated Task', priority: 2 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedTodoItem);
      expect(todoItemService.updateTodoItem).toHaveBeenCalledWith('6746e98f902ee6efcbe583eb', { label: 'Updated Task', priority: 2 });
    });

    it('should return 404 if todoItem to update is not found', async () => {
      (todoItemService.updateTodoItem as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/6746e98f902ee6efcbe583eb').send({ label: 'Updated Task', priority: 2 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoItem not found' });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a todoItem and return 200', async () => {
      const mockDeletedTodoItem = {
        _id: '6746e98f902ee6efcbe583eb',
        assignedTo: 'user6746e98f902ee6efcbe583eb',
        label: 'Task to delete',
        description: 'Description',
        priority: 1,
        tag: ['tag1'],
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        state: 'To do',
      };
      (todoItemService.deleteTodoItem as jest.Mock).mockResolvedValue(mockDeletedTodoItem);

      const response = await request(app).delete('/6746e98f902ee6efcbe583eb');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeletedTodoItem);
      expect(todoItemService.deleteTodoItem).toHaveBeenCalledWith('6746e98f902ee6efcbe583eb');
    });

    it('should return 404 if todoItem to delete is not found', async () => {
      (todoItemService.deleteTodoItem as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/6746e98f902ee6efcbe583eb');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'TodoItem not found' });
    });
  });
});

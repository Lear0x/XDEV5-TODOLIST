import { Request, Response } from 'express';
import todoItemService from '../services/todoItem.service';

export const createTodoItem = async (req: Request, res: Response) => {
  try {
    const todoItem = await todoItemService.createTodoItem(req.body);
    res.status(201).json(todoItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTodoItemById = async (req: Request, res: Response) => {
  try {
    const todoItem = await todoItemService.getTodoItemById(req.params.id);
    if (!todoItem) return res.status(404).json({ error: 'TodoItem not found' });
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTodoItem = async (req: Request, res: Response) => {
  try {
    const todoItem = await todoItemService.updateTodoItem(req.params.id, req.body);
    if (!todoItem) return res.status(404).json({ error: 'TodoItem not found' });
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodoItem = async (req: Request, res: Response) => {
  try {
    const todoItem = await todoItemService.deleteTodoItem(req.params.id);
    if (!todoItem) return res.status(404).json({ error: 'TodoItem not found' });
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

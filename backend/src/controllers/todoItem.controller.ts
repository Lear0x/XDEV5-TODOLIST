import { Request, Response, NextFunction } from 'express';
import todoItemService from '../services/todoItem.service';

export const createTodoItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoItem = await todoItemService.createTodoItem(req.body);
    res.status(201).json(todoItem);
  } catch (error) {
    next(error); // Passe l'erreur au middleware global
  }
};

export const getTodoItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoItem = await todoItemService.getTodoItemById(req.params.id);
    if (!todoItem) {
      res.status(404).json({ error: 'TodoItem not found' });
    } else {
      res.status(200).json(todoItem);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTodoItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoItem = await todoItemService.updateTodoItem(req.params.id, req.body);
    if (!todoItem) {
      res.status(404).json({ error: 'TodoItem not found' });
    } else {
      res.status(200).json(todoItem);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTodoItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoItem = await todoItemService.deleteTodoItem(req.params.id);
    if (!todoItem) {
      res.status(404).json({ error: 'TodoItem not found' });
    } else {
      res.status(200).json(todoItem);
    }
  } catch (error) {
    next(error);
  }
};

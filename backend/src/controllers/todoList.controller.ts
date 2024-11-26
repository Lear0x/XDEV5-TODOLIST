import { Request, Response, NextFunction } from 'express';
import todoListService from '../services/todoList.service';

export const createTodoList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoList = await todoListService.createTodoList(req.body);
    res.status(201).json(todoList);
  } catch (error) {
    next(error); // Passe l'erreur au middleware global
  }
};



export const getTodoListById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoList = await todoListService.getTodoListById(req.params.id);
    if (!todoList) {
      res.status(404).json({ error: 'TodoList not found' });
    } else {
      res.status(200).json(todoList);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllTodoLists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoLists = await todoListService.getAllTodoLists();
    res.status(200).json(todoLists);
  } catch (error) {
    next(error);
  }
}

export const updateTodoList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoList = await todoListService.updateTodoList(req.params.id, req.body);
    if (!todoList) {
      res.status(404).json({ error: 'TodoList not found' });
    } else {
      res.status(200).json(todoList);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTodoList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoList = await todoListService.deleteTodoList(req.params.id);
    if (!todoList) {
      res.status(404).json({ error: 'TodoList not found' });
    } else {
      res.status(200).json(todoList);
    }
  } catch (error) {
    next(error);
  }
};

export const addTodoItemToList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { listId, todoItemId } = req.params;
    const updatedList = await todoListService.addTodoItemToList(listId, todoItemId);
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
};

import { Request, Response } from 'express';
import todoListService from '../services/todoList.service';

export const createTodoList = async (req: Request, res: Response) => {
  try {
    const todoList = await todoListService.createTodoList(req.body);
    res.status(201).json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTodoListById = async (req: Request, res: Response) => {
  try {
    const todoList = await todoListService.getTodoListById(req.params.id);
    if (!todoList) return res.status(404).json({ error: 'TodoList not found' });
    res.status(200).json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTodoList = async (req: Request, res: Response) => {
  try {
    const todoList = await todoListService.updateTodoList(req.params.id, req.body);
    if (!todoList) return res.status(404).json({ error: 'TodoList not found' });
    res.status(200).json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodoList = async (req: Request, res: Response) => {
  try {
    const todoList = await todoListService.deleteTodoList(req.params.id);
    if (!todoList) return res.status(404).json({ error: 'TodoList not found' });
    res.status(200).json(todoList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addTodoItemToList = async (req: Request, res: Response) => {
  try {
    const { listId, todoItemId } = req.params;
    const updatedList = await todoListService.addTodoItemToList(listId, todoItemId);
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

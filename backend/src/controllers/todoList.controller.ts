import { Request, Response, NextFunction } from 'express';
import todoListService from '../services/todoList.service';
import mongoose from 'mongoose';

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
    const listId = req.params.id;
    const { todoItemId, ...updateData } = req.body;

    // Vérifier si l'ID de la liste est valide
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      res.status(400).json({ error: 'Invalid TodoList ID' });
      return;
    }

    // Ajouter un todoItemId si fourni
    if (todoItemId) {
      if (!mongoose.Types.ObjectId.isValid(todoItemId)) {
        res.status(400).json({ error: 'Invalid TodoItem ID' });
        return;
      }

      // Récupérer la liste pour vérifier et ajouter l'élément
      const todoList = await todoListService.getTodoListById(listId);
      if (!todoList) {
        res.status(404).json({ error: 'TodoList not found' });
        return;
      }

      // Ajouter l'ID de l'élément si ce n'est pas déjà présent
      if (!todoList.todoItems.includes(todoItemId)) {
        todoList.todoItems.push(todoItemId as any);
        await todoList.save();
      }
    }

    // Mettre à jour les autres champs
    const updatedList = await todoListService.updateTodoList(listId, updateData);

    if (!updatedList) {
      res.status(404).json({ error: 'TodoList not found' });
    } else {
      res.status(200).json(updatedList);
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


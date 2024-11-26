import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import mongoose from 'mongoose';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};


export const getTodoListsByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.getTodoListsByUser(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user.todoLists);
    }
  } catch (error) {
    next(error);
  }
}


export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const { todoListId, ...updateData } = req.body;

    // Vérifier si l'ID utilisateur est valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: 'Invalid User ID' });
      return;
    }

    // Ajouter un todoListId si fourni
    if (todoListId) {
      if (!mongoose.Types.ObjectId.isValid(todoListId)) {
        res.status(400).json({ error: 'Invalid TodoList ID' });
        return;
      }

      // Ajouter la todoListId au tableau
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Ajouter l'ID si ce n'est pas déjà présent
      if (!user.todoLists.includes(todoListId)) {
        user.todoLists.push(todoListId as any);
      }

      await user.save();
    }

    // Mettre à jour les autres champs
    const updatedUser = await userService.updateUser(userId, updateData);

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};
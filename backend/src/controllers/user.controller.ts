import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

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

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;

    // Vérification que l'ID est fourni
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return; // Fin de la fonction
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await userService.updateUser(userId, req.body);

    // Si l'utilisateur n'existe pas
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return; // Fin de la fonction
    }

    // Retourner l'utilisateur mis à jour
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error); // Transmettre l'erreur au middleware global
  }
};
import { Router, Request, Response } from 'express';
import {createUser, getTodoListsByUser, getUserById, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/:userId/todoLists', getTodoListsByUser);
router.put('/:id', updateUser);

export default router;
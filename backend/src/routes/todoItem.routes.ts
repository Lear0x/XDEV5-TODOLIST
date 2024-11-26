import { Router } from 'express';
import { createTodoItem, getTodoItemById, updateTodoItem, deleteTodoItem } from '../controllers/todoItem.controller';

const router = Router();

router.post('/', createTodoItem);
router.get('/:id', getTodoItemById);
router.put('/:id', updateTodoItem);
router.delete('/:id', deleteTodoItem);

export default router;

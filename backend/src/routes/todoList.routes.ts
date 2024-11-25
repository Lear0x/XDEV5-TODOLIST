import { Router } from 'express';
import { createTodoList, getTodoListById, updateTodoList, deleteTodoList, addTodoItemToList } from '../controllers/todoList.controller';

const router = Router();

router.post('/', createTodoList);
router.get('/:id', getTodoListById);
router.put('/:id', updateTodoList);
router.delete('/:id', deleteTodoList);
router.put('/:listId/add/:todoItemId', addTodoItemToList);

export default router;

import { Router } from 'express';
import { createTodoList, getTodoListById, updateTodoList, deleteTodoList,  getAllTodoLists } from '../controllers/todoList.controller';

const router = Router();

router.post('/', createTodoList);

router.get('/', getAllTodoLists);
router.get('/:id', getTodoListById);

router.put('/:id', updateTodoList);

router.delete('/:id', deleteTodoList);

export default router;

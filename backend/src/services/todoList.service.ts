import { TodoList, ITodoList } from '../models/todoList.model';
import { TodoItem, ITodoItem } from '../models/todoItem.model';

class TodoListService {
  async createTodoList(data: Partial<ITodoList>): Promise<ITodoList> {
    const todoList = new TodoList(data);
    return await todoList.save();
  }

  async getTodoListById(id: string): Promise<ITodoList | null> {
    return await TodoList.findById(id).populate('todoItems');
  }

  async updateTodoList(id: string, data: Partial<ITodoList>): Promise<ITodoList | null> {
    return await TodoList.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTodoList(id: string): Promise<ITodoList | null> {
    return await TodoList.findByIdAndDelete(id);
  }

  async addTodoItemToList(listId: string, todoItemId: string): Promise<ITodoList | null> {
    const todoList = await TodoList.findById(listId);
    if (!todoList) throw new Error('TodoList not found');

    todoList.todoItems.push(todoItemId as any);
    return await todoList.save();
  }

  async getAllTodoLists(): Promise<ITodoList[]> {
    return await TodoList.find().populate('todoItems');
  }
}

export default new TodoListService();

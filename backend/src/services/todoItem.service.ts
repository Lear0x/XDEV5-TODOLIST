import { TodoItem, ITodoItem } from '../models/todoItem.model';

class TodoItemService {
  async createTodoItem(data: Partial<ITodoItem>): Promise<ITodoItem> {
    const todoItem = new TodoItem(data);
    return await todoItem.save();
  }

  async getTodoItemById(id: string): Promise<ITodoItem | null> {
    return await TodoItem.findById(id).populate('assignedTo');
  }

  async updateTodoItem(id: string, data: Partial<ITodoItem>): Promise<ITodoItem | null> {
    return await TodoItem.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTodoItem(id: string): Promise<ITodoItem | null> {
    return await TodoItem.findByIdAndDelete(id);
  }

  async getAllTodoItems(): Promise<ITodoItem[]> {
    return await TodoItem.find().populate('assignedTo');
  }
}

export default new TodoItemService();

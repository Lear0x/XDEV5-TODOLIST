import { Schema, model, Document } from 'mongoose';

export interface ITodoList extends Document {
  label: string;
  todoItems: Schema.Types.ObjectId[];
}

const todoListSchema = new Schema<ITodoList>({
  label: { type: String, required: true },
  todoItems: [{ type: Schema.Types.ObjectId, ref: 'TodoItem' }]
});

export const TodoList = model<ITodoList>('TodoList', todoListSchema);

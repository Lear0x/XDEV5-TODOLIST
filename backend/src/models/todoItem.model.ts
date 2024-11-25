import { Schema, model, Document } from 'mongoose';

export interface ITodoItem extends Document {
  assignedTo: Schema.Types.ObjectId;
  label: string;
  description: string;
  priority: number;
  tag: string[];
  startDate: Date;
  endDate: Date;
  state: 'To do' | 'pending' | 'Done';
}

const todoItemSchema = new Schema<ITodoItem>({
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, default: 1 },
  tag: [{ type: String }],
  startDate: { type: Date },
  endDate: { type: Date },
  state: { type: String, enum: ['To do', 'pending', 'Done'], default: 'Done' }
});

export const TodoItem = model<ITodoItem>('TodoItem', todoItemSchema);

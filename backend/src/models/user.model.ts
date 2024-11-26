import { Schema, model, Document } from 'mongoose';

// Interface pour typer les documents User
export interface IUser extends Document {
  pseudo: string;
  mail: string;
  todoLists: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  pseudo: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  todoLists: [{ type: Schema.Types.ObjectId, ref: 'TodoList' }]
});

export const User = model<IUser>('User', userSchema);

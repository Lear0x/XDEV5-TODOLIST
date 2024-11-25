import { Schema, model, Document } from 'mongoose';

// Interface pour typer les documents User
export interface IUser extends Document {
  pseudo: string;
  mail: string;
  todoItems: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  pseudo: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  todoItems: [{ type: Schema.Types.ObjectId, ref: 'TodoItem' }]
});

export const User = model<IUser>('User', userSchema);

import { User, IUser } from '../models/user.model';

class UserService {
  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).populate('todoLists');
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  async getTodoListsByUser(userId: string): Promise<IUser | null> {
    return await User.findById(userId).populate('todoLists');
  }
}

export default new UserService();

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const UserModel = mongoose.model('User', userSchema);

  class UserDao {
    
    async createUser(user: any): Promise<any> {
      const createdUser = await UserModel.create(user);
      return createdUser.toObject();
    }

    async getAllUsers(): Promise<any[]> {
        const users = await UserModel.find().exec();
        return users.map((user) => user.toObject());
      }
 

}
export const userDao = new UserDao();


 
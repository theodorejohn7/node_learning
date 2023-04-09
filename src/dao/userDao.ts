import mongoose from 'mongoose';
import { UserDocument } from '../models/user';
import UserModel from '../models/user';
import User from '../models/user';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export class UserDao {

  private userModel = UserModel;


  constructor(userModel: typeof User) {
    this.userModel = userModel;
  }

  async createUser(user: any): Promise<any> {
    const createdUser = await UserModel.create(user);
    return createdUser.toObject();
  }

  async getAllUsers(): Promise<any[]> {
    const users = await UserModel.find().exec();
    return users.map((user) => user.toObject());
  }

  async findUserByEmailAndPassword(email: string, password: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ email, password });
    return user ? user.toObject() : null;
  }
}

export const userDao = new UserDao(UserModel);


// import mongoose from 'mongoose';
// import { Db } from 'mongodb';
// import User from '../models/user';
// import { UserDocument } from '../models/user';

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//   });

//   const UserModel = mongoose.model('UserModel', userSchema);

//   class UserDao {
    
//     async createUser(user: any): Promise<any> {
//       const createdUser = await UserModel.create(user);
//       return createdUser.toObject();
//     }

//     async getAllUsers(): Promise<any[]> {
//         const users = await UserModel.find().exec();
//         return users.map((user) => user.toObject());
//       }
 

//       async findUserByEmailAndPassword(email: string, password: string): Promise<  UserDocument | null> {
//         const user = await UserModel.findOne({ email, password });
//         return user ? new User(user) : null;
//       }

// }
// export const userDao = new UserDao();


 

import User from "../models/user";
import { userDao } from "../dao/userDao";

 class UserService {
  // async getAllUsers() {
  //   const users = await User.find();
  //   return users;
  // }

  // async createUser(user: { name: string; email: string; password: string }) {
  //   const newUser = await User.create(user);
  //   return newUser;
  // }

  async getAllUsers(): Promise<any[]> {
    return userDao.getAllUsers();
  }

  async createUser(user:  { name: string; email: string; password: string }): Promise<any> {
    return userDao.createUser(user);
  }

}


export const userService = new UserService();

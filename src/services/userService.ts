
import User from "../models/user";
import { userDao } from "../dao/userDao";

 class UserService {
 
  async getAllUsers(): Promise<any[]> {
    return userDao.getAllUsers();
  }

  async createUser(user:  { name: string; email: string; password: string }): Promise<any> {
    return userDao.createUser(user);
  }

}


export const userService = new UserService();

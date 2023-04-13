
import { userDao } from "../dao/userDao";

class UserService {
  async createUser(user: {
    name: string;
    email: string;
    password: string;
    securityQuestion: string;
    securityAnswer: string;
  }): Promise<any> {
    return userDao.createUser(user);
  }

  async getAllUsers(): Promise<any[]> {
    return userDao.getAllUsers();
  }

  async resetPassword(userDetails: {
    email: string;
    newPassword: string;
    securityQuestion: string;
    securityAnswer: string;
  }): Promise<any> {
    return userDao.resetPassword(userDetails);
  }

  async deleteUser(email: string): Promise<any> {
    return userDao.deleteUser(email);
  }
}

export const userService = new UserService();

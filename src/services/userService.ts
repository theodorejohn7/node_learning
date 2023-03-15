
import User from "../models/user";

export default class UserService {
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async createUser(user: { name: string; email: string; password: string }) {
    const newUser = await User.create(user);
    return newUser;
  }

}

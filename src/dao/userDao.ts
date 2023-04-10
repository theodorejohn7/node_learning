import mongoose from "mongoose";
import { UserDocument } from "../models/user";
import UserModel from "../models/user";
import User from "../models/user";
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

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ email, password });
    return user ? user.toObject() : null;
  }

  async storeRefreshToken(user: any, refreshToken: string): Promise<any> {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ _id: user }, { refreshToken }, { new: true })
        .lean();
      return updatedUser;
    } catch (error) {
      console.error("Error storing refresh token:", error);
      throw new Error("Error storing refresh token");
    }
  }
}

export const userDao = new UserDao(UserModel);

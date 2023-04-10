import { Request, Response } from "express";

import { sign, verify } from "jsonwebtoken";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/user";

export class AuthService {
  private static readonly secret = "mY-$eCrEt";

  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao(UserModel);
  }
  static generateToken(payload: any): string {
    const token = sign(payload, this.secret);
    return token;
  }

  static generateAccessToken(payload: any): string {
    const accessToken = sign(
      { userId: payload._id },
      process.env.ACCESS_TOKEN_SECRET || this.secret,
      { expiresIn: "15m" }
    );
    return accessToken;
  }

  static generateRefreshToken(payload: any): string {
    const refreshToken = sign(
      { userId: payload._id },
      process.env.REFRESH_TOKEN_SECRET || this.secret,
      { expiresIn: "7d" }
    );
    return refreshToken;
  }

  static verifyToken(token: string): any {
    try {
      const decoded = verify(token, this.secret);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  async loginUser(
    loginData: {
      email: string;
      password: string;
    },
    res: Response
  ): Promise<any> {
    try {
      const { email, password } = loginData;

      const isValidUser = await this.userDao.findUserByEmail(email);

      const isValidPassword = await this.userDao.findUserByEmailAndPassword(
        email,
        password
      );

      if (!isValidPassword || !isValidUser) {
        throw new Error("Invalid email or password");
      }

      const accessToken = AuthService.generateAccessToken(isValidUser);
      const refreshToken = AuthService.generateRefreshToken(isValidUser);

      await this.userDao.storeRefreshToken(isValidUser, refreshToken);

      return { email,accessToken, refreshToken };
    } catch (error) { 
      throw error;
    }
  }
}

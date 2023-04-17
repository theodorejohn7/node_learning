import { Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthService } from "../services/authService";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/user";
import Joi from "joi";

export class UserController {
  private readonly userDao: UserDao;
  private readonly authService: AuthService;

  constructor() {
    this.userDao = new UserDao(UserModel);
    this.authService = new AuthService();
  }

  public async createUser(req: Request, res: Response) {
    const userSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      securityQuestion: Joi.required(),
      securityAnswer: Joi.required(),
      role: Joi.required(),

    });

    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // const user = req.body;

    try {
      const createdUser = await userService.createUser(value);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create user" });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get users" });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      const userDetails = req.body;
      const resetDetails = await userService.resetPassword(userDetails);
      res.status(201).json(resetDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const deleteUser = await userService.deleteUser(email);
      res.json(deleteUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user " });
    }
  }
}

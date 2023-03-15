import { Request, Response } from 'express';
import User from '../models/user';
import UserService from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }


  public async createUser(req: Request, res: Response): Promise<void> {
    try {
    
      console.log("@#$354 ", req.body)
      // const newUser = await this.userService.createUser(req.body as User);
      const newUser = await this.userService.createUser(req.body );

      res.status(201).json(newUser);
    } catch (error) {
      // console.error(error);
      res.status(500).send('Server Error');
    }
  }

}

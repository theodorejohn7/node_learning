import { Request, Response } from "express"; 
import { userService } from "../services/userService";
export class UserController {
 
    constructor() {
      // this.userService = new UserService();
    }
  

  public async createUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const createdUser = await userService.createUser(user);
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
}
 
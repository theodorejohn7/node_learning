import { Request, Response } from "express";
import User from "../models/user";
// import UserService from "../services/userService";
// import { userDao } from '../dao/user.dao';
import { userDao } from "../dao/userDao";
import { userService } from "../services/userService";
export class UserController {

  // private userService: UserService;

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

// export async function createUser(req: Request, res: Response) {
//   const user = req.body;
//   try {
//     const createdUser = await userService.createUser(user);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// }

// export async function getAllUsers(req: Request, res: Response) {
//   try {
//     const users = await userService.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to get users' });
//   }
// }

// export class UserController {
//   private userService: UserService;

//   constructor() {
//     this.userService = new UserService();
//   }

//   public async getAllUsers(req: Request, res: Response): Promise<void> {
//     try {
//       const users = await this.userService.getAllUsers();
//       res.status(200).json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   }

//   public async  createUser(req: Request, res: Response) {
//     const user = req.body;
//     try {
//       const createdUser = await userService.createUser(user);
//       res.status(201).json(createdUser);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to create user' });
//     }
//   }

//   // public async createUser(req: Request, res: Response): Promise<void> {
//   //   try {

//   //     console.log("@#$354 ", req.body)
//   //     // const newUser = await this.userService.createUser(req.body as User);
//   //     const newUser = await this.userService.createUser(req.body );

//   //     res.status(201).json(newUser);
//   //   } catch (error) {
//   //     // console.error(error);
//   //     res.status(500).send('Server Error');
//   //   }
//   // }

// }

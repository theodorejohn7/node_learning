import { Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthService } from "../services/authService";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/user";

export class UserController {

    private readonly userDao: UserDao;
    private readonly authService: AuthService;

    constructor() {
      this.userDao = new UserDao(UserModel);
      this.authService = new AuthService();
    }

    // async login(req: Request, res: Response): Promise<void> {
    //   const { email, password } = req.body;
    //   const user = await this.userDao.findUserByEmailAndPassword(email, password);
    //   if (user) {
    //     const token = this.authService.generateToken({ userId: user._id });
    //     res.json({ token });
    //   } else {
    //     res.status(401).json({ message: 'Invalid email or password' });
    //   }
    // }

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




// import { Request, Response } from "express";
// import { userService } from "../services/userService";
// import { AuthService } from "../services/authService";
// import { userDao } from "../dao/userDao";
// // import { UserDocument } from "../models/user";
// import UserModel from "../models/user";

// export class UserController {

//     constructor() {
//       // this.userDao = new UserDao();

//       // this.userService = new UserService();
//     }

//     async login(req: Request, res: Response): Promise<void> {
//       const { email, password } = req.body;
//       const user: typeof UserModel |null  = await userDao.findUserByEmailAndPassword(email, password);
//       if (user) {
//         // const token = AuthService.generateToken({ userId: user._id });
//         const token = AuthService.generateToken({ userId: user.email });

//         res.json({ token });
//       } else {
//         res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//   public async createUser(req: Request, res: Response) {
//     const user = req.body;
//     try {
//       const createdUser = await userService.createUser(user);
//       res.status(201).json(createdUser);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to create user" });
//     }
//   }

//   public async getAllUsers(req: Request, res: Response) {
//     try {
//       const users = await userService.getAllUsers();
//       res.json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to get users" });
//     }
//   }
// }

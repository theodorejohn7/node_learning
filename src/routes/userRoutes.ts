import express, { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get-users', this.getAllUsers.bind(this));
    this.router.post('/add-user', this.createUser.bind(this));
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userController.getAllUsers(req, res);
    res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    console.log("@$#123 req",req.body)
    const user = await this.userController.createUser(req, res);
    res.json(user);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
 
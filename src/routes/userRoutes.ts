import express, { Router, Request, Response } from "express";
import { UserController } from "../controllers/userController";

class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/list-all", this.getAllUsers.bind(this));
    this.router.post("/signup", this.createUser.bind(this));
    this.router.put("/reset-password", this.resetPassword.bind(this));
    this.router.delete("/delete/:email", this.deleteUser.bind(this));
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userController.getAllUsers(req, res);
    res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.userController.createUser(req, res);
    res.json(user);
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    const reset = await this.userController.resetPassword(req, res);
    res.json(reset);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    console.log("@$# req", req.params.email);
    const deleteUser = await this.userController.deleteUser(req, res);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;

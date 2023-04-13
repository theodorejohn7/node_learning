import express, { Router, Request, Response } from "express";

import { AuthController } from "../controllers/authController"; 

export class AuthRouter {
  private router: Router;
 
  private authController: AuthController;

  constructor() {
    this.router = express.Router(); 
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/login", this.loginUser.bind(this));
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const login = await this.authController.loginUser(req, res);
  }

  public getRouter(): Router {
    return this.router;
  }
}

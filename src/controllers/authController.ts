import { Request, Response } from "express"; 
import { AuthService } from "../services/authService";
  
export class AuthController { 
  private readonly authService: AuthService;

  constructor() { 
    this.authService = new AuthService();
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const details = req.body;
    try {
      const loginDetails = await this.authService.loginUser(details, res);
      res.status(201).json(loginDetails);
    } catch (error:any) {
      console.log("ERROR====>>>", error.message);
      res.status(500).json({ message: error.message });
    }
  }
 
}

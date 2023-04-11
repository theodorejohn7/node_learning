import { Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthService } from "../services/authService";
import ExpenseService from "../services/expenseService";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/user";

export class ExpenseController {
  private readonly userDao: UserDao;
  private readonly expenseService: ExpenseService;

  constructor() {
    this.userDao = new UserDao(UserModel);
    this.expenseService = new ExpenseService();
  }

  public async addExpense(req: Request, res: Response) {
    try {
      const data = req.body;
      const newExpense = await this.expenseService.createExpense(data);
      res.status(201).json(newExpense);

    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Failed to add expense  ${error.message}` });
    }
  }
}

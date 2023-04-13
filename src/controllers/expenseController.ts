import { Request, Response } from "express";
import ExpenseService from "../services/expenseService";
import { UserDao } from "../dao/userDao";
import UserModel from "../models/user";
import LoggerService from "../logger/logger.config";
export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

interface CustomRequest extends Request {
  userId: string;
}

export class ExpenseController {
  private readonly userDao: UserDao;
  private readonly expenseService: ExpenseService;
  private readonly logger: LoggerService;

  constructor() {
    this.userDao = new UserDao(UserModel);
    this.expenseService = new ExpenseService();
    this.logger = new LoggerService();
    this.logger.serviceName("Expense Controller New");
  }

  public async addExpense(req: CustomRequest, res: Response) {
    try {
      console.log("@$# inside ADD EXPENSE", req.userId);
      const data = req.body;
      // const userId = (req as AuthRequest).user.id;
      const user = req.userId;
      const newExpense = await this.expenseService.createExpense({
        ...data,
        user,
      });
      res.status(201).json(newExpense);
    } catch (error: any) {
      this.logger.error("Faile to add expense", error);
      res
        .status(500)
        .json({ message: `Failed to add expense  ${error.message}` });
    }
  }

  public async getAllExpenses(req: Request, res: Response) {
    try {
      const allExpenses = await this.expenseService.getAllExpenses();
      this.logger.info("All Expense listed");

      res.status(201).json(allExpenses);
    } catch (error: any) {
      res.status(500).json({ message: "Failedto get all expenses", error });
    }
  }

  public async editExpense(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      description,
      amount,
      category,
      date,
      paymentMethod,
      merchant,
      location,
      imagePath,
    } = req.body;

    try {
      const expenseUpdate: {
        description: string;
        amount: number;
        category: string;
        date: Date;
        paymentMethod: string;
        merchant: string;
        location: string;
        imagePath: string;
      } = {
        description,
        amount,
        category,
        date,
        paymentMethod,
        merchant,
        location,
        imagePath,
      };

      const updatedExpense = await this.expenseService.editExpense(
        id,
        description,
        amount,
        category,
        date,
        paymentMethod,
        merchant,
        location,
        imagePath
      );
      res.status(200).json(updatedExpense);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Failed to update expense" });
    }
  }

  public async deleteExpense(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deleteExpense = await this.expenseService.deleteExpense(id);
      res.json(deleteExpense);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense" });
    }
  }
}

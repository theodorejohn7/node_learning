import { ExpenseDao } from "../dao/expenseDao";
import ExpenseModel from "../models/expenseModel";
import { ExpenseDocument } from "../models/expenseModel";

export default class ExpenseService {
  private expenseDao: ExpenseDao;

  constructor() {
    this.expenseDao = new ExpenseDao(ExpenseModel);
  }

  async createExpense(expenseData: {
    description: string;
    amount: number;
    category: string;
    date: Date;
    paymentMethod: string;
    merchant?: string;
    location?: string;
    imagePath?: string;
  }): Promise<any> {
    try {
      return await this.expenseDao.createExpense(expenseData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllExpenses(): Promise<any[]> {
    try {
      return await this.expenseDao.getAllExpenses();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async editExpense(
    id: string,
    description: string,
    amount: number,
    category: string,
    date: Date,
    paymentMethod: string,
    merchant: string,
    location: string,
    imagePath: string
    // updatedExpense: ExpenseDocument
  ): Promise<ExpenseDocument | null> {
    try {
      const expense = await ExpenseModel.findOne({ _id: id });

      const updatedExpense = {
        description,
        amount,
        category,
        date,
        paymentMethod,
        merchant,
        location,
        imagePath,
      };
      if (!expense) {
        throw new Error(`Expense with id ${id} not found`);
      }
      return await this.expenseDao.editExpense(id, updatedExpense);
    } catch (error: any) {
      throw new Error(`Failed to edit expense: ${error.message}`);
    }
  }
}

import ExpenseModel, { ExpenseDocument } from "../models/expenseModel";
import { Model } from "mongoose";

export class ExpenseDao {
  //   private readonly expenseModel = ExpenseModel;
  private expenseModel: Model<ExpenseDocument>;

  constructor(expenseModel: typeof ExpenseModel) {
    this.expenseModel = expenseModel;
  }

  async createExpense(expense: any): Promise<any> {
    try {
      if (!expense.paymentMethod) {
        throw new Error("paymentMethod is required");
      }

      if (!expense.date) {
        throw new Error("date is required");
      }

      if (!expense.category) {
        throw new Error("category is required");
      }

      if (!expense.amount) {
        throw new Error("amount is required");
      }

      if (!expense.description) {
        throw new Error("description is required");
      }

      const addedExpense = await ExpenseModel.create(expense);
      return addedExpense.toObject();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllExpenses(): Promise<any[]> {
    try {
      const expenses = await ExpenseModel.find().exec();
      return expenses.map((expense) => expense.toObject());
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async editExpense(
    id: string,
    expenseData: Partial<ExpenseDocument>
  ): Promise<ExpenseDocument | null> {
    try {
      const expense = await this.expenseModel.findByIdAndUpdate(
        id,
        expenseData,
        { new: true }
      );
      return expense;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

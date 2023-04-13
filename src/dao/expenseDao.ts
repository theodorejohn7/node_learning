import ExpenseModel, { ExpenseDocument } from "../models/expenseModel";
import mongoose, { Model, Types } from "mongoose";
import { UserDocument } from "../models/user";
 
// interface UserLinkedModal {
//   _id: typeof Types.ObjectId;
//   name: string;
//   email:string;
// }

interface UserLinkedModal {
  _id: typeof Types.ObjectId;
  name: string;
  email: string;
}


interface ExpenseData {
  id: string;
  userName: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  paymentMethod: string;
  merchant: string;
  location: string;
}

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

  async getAllExpenses(): Promise<ExpenseData[]> {
    try {
      const expenses = await ExpenseModel.find()
        .populate<UserDocument>("user", "name email")
        .exec();
  
      return expenses.map((expense) => ({
        id: expense.id,
        userName: expense.user?.name ?? "",
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        paymentMethod: expense.paymentMethod,
        merchant: expense.merchant ?? "",
        location: expense.location ?? "",
      }));
    } catch (error:any) {
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

  async deleteExpense(expenseId: string): Promise<any> {
    try {
      const deletedExpense = await this.expenseModel.findOneAndDelete({
        _id: expenseId,
      });
      if (deletedExpense) {
        return { message: `Expense with id ${expenseId} deleted successfully` };
      }
    } catch (error) {
      throw new Error("Error deleting expense");
    }
  }
}

import ExpenseModel from "../models/expenseModel";

export class ExpenseDao {
  constructor() {}

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
}

import { ExpenseDao } from "../dao/expenseDao";

export default class ExpenseService {
  private expenseDao: ExpenseDao;

  constructor() {
    this.expenseDao = new ExpenseDao();
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
      const val = await this.expenseDao.createExpense(expenseData);
      return val;
    } catch (error: any) { 
      throw new Error(error.message);
    }
  }
}

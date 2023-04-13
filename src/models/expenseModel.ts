import { Schema, model, Document, Types } from "mongoose";
const { ObjectId } = Types;

export interface ExpenseAttributes {
  description: string;
  amount: number;
  category: string;
  date: Date;
  paymentMethod: string;
  merchant?: string;
  location?: string;
  imagePath?: string;
  user: typeof ObjectId;
}

export interface ExpenseDocument extends ExpenseAttributes, Document {}

const expenseSchema = new Schema<ExpenseDocument>({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  merchant: {
    type: String,
    default: undefined,
  },
  location: {
    type: String,
    default: undefined,
  },
  user: {
    type:  ObjectId,
    ref: "User",
    required: true,
  },
});

const ExpenseModel = model<ExpenseDocument>("Expense", expenseSchema);

export default ExpenseModel;

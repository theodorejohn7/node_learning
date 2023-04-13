"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const expenseSchema = new mongoose_1.Schema({
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
        type: ObjectId,
        ref: "User",
        required: true,
    },
});
const ExpenseModel = (0, mongoose_1.model)("Expense", expenseSchema);
exports.default = ExpenseModel;
//# sourceMappingURL=expenseModel.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDao = void 0;
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
class ExpenseDao {
    constructor(expenseModel) {
        this.expenseModel = expenseModel;
    }
    createExpense(expense) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const addedExpense = yield expenseModel_1.default.create(expense);
                return addedExpense.toObject();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenses = yield expenseModel_1.default.find()
                    .populate("user", "name email")
                    .exec();
                return expenses.map((expense) => {
                    var _a, _b, _c, _d;
                    return ({
                        id: expense.id,
                        userName: (_b = (_a = expense.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "",
                        description: expense.description,
                        amount: expense.amount,
                        category: expense.category,
                        date: expense.date,
                        paymentMethod: expense.paymentMethod,
                        merchant: (_c = expense.merchant) !== null && _c !== void 0 ? _c : "",
                        location: (_d = expense.location) !== null && _d !== void 0 ? _d : "",
                    });
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    editExpense(id, expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = yield this.expenseModel.findByIdAndUpdate(id, expenseData, { new: true });
                return expense;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    deleteExpense(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedExpense = yield this.expenseModel.findOneAndDelete({
                    _id: expenseId,
                });
                if (deletedExpense) {
                    return { message: `Expense with id ${expenseId} deleted successfully` };
                }
            }
            catch (error) {
                throw new Error("Error deleting expense");
            }
        });
    }
}
exports.ExpenseDao = ExpenseDao;
//# sourceMappingURL=expenseDao.js.map
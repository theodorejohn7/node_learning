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
const expenseDao_1 = require("../dao/expenseDao");
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
class ExpenseService {
    constructor() {
        this.expenseDao = new expenseDao_1.ExpenseDao(expenseModel_1.default);
    }
    createExpense(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.expenseDao.createExpense(expenseData);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.expenseDao.getAllExpenses();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    editExpense(id, description, amount, category, date, paymentMethod, merchant, location, imagePath
    // updatedExpense: ExpenseDocument
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = yield expenseModel_1.default.findOne({ _id: id });
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
                return yield this.expenseDao.editExpense(id, updatedExpense);
            }
            catch (error) {
                throw new Error(`Failed to edit expense: ${error.message}`);
            }
        });
    }
    deleteExpense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.expenseDao.deleteExpense(id);
        });
    }
}
exports.default = ExpenseService;
//# sourceMappingURL=expenseService.js.map
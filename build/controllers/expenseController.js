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
exports.ExpenseController = void 0;
const expenseService_1 = __importDefault(require("../services/expenseService"));
const userDao_1 = require("../dao/userDao");
const user_1 = __importDefault(require("../models/user"));
const logger_config_1 = __importDefault(require("../logger/logger.config"));
class ExpenseController {
    constructor() {
        this.userDao = new userDao_1.UserDao(user_1.default);
        this.expenseService = new expenseService_1.default();
        this.logger = new logger_config_1.default();
        this.logger.serviceName("Expense Controller New");
    }
    addExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("@$# inside ADD EXPENSE", req.userId);
                const data = req.body;
                // const userId = (req as AuthRequest).user.id;
                const user = req.userId;
                const newExpense = yield this.expenseService.createExpense(Object.assign(Object.assign({}, data), { user }));
                res.status(201).json(newExpense);
            }
            catch (error) {
                this.logger.error("Faile to add expense", error);
                res
                    .status(500)
                    .json({ message: `Failed to add expense  ${error.message}` });
            }
        });
    }
    getAllExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allExpenses = yield this.expenseService.getAllExpenses();
                this.logger.info("All Expense listed");
                res.status(201).json(allExpenses);
            }
            catch (error) {
                res.status(500).json({ message: "Failedto get all expenses", error });
            }
        });
    }
    editExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { description, amount, category, date, paymentMethod, merchant, location, imagePath, } = req.body;
            try {
                const expenseUpdate = {
                    description,
                    amount,
                    category,
                    date,
                    paymentMethod,
                    merchant,
                    location,
                    imagePath,
                };
                const updatedExpense = yield this.expenseService.editExpense(id, description, amount, category, date, paymentMethod, merchant, location, imagePath);
                res.status(200).json(updatedExpense);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to update expense" });
            }
        });
    }
    deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deleteExpense = yield this.expenseService.deleteExpense(id);
                res.json(deleteExpense);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete expense" });
            }
        });
    }
}
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expenseController.js.map
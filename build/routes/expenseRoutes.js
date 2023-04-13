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
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
class ExpenseRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.expenseController = new expenseController_1.ExpenseController();
        this.authMiddleware = new authMiddleware_1.AuthMiddleware();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/add", this.authMiddleware.authenticateToken, this.authMiddleware.authorizeRole("admin"), this.addExpense.bind(this));
        this.router.get("/list", this.authMiddleware.authenticateToken, this.listExpense.bind(this));
        this.router.put("/update/:id", this.authMiddleware.authenticateToken, this.authMiddleware.authorizeRole("admin"), this.editExpense.bind(this));
        this.router.delete("/delete/:id", this.authMiddleware.authenticateToken, this.authMiddleware.authorizeRole("admin"), this.deleteExpense.bind(this));
    }
    addExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExpense = yield this.expenseController.addExpense(req, res);
            res.json(newExpense);
        });
    }
    listExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //no params return all expense
            //?id=id return only for the id
            //?start_date=...&end_date=... return on date range
            console.log("@$# listExpense", req.body, "params", req.query);
            const allExpenses = yield this.expenseController.getAllExpenses(req, res);
            res.json(allExpenses);
        });
    }
    editExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // PUT /expenses/:id: Updates a specific expense by ID for any user
            // console.log("@$# editExpense", req.body, "params", req.params);
            const updateExpense = yield this.expenseController.editExpense(req, res);
            res.json(updateExpense);
        });
    }
    deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // DELETE /expenses/:id: Deletes a specific expense by ID for any user
            console.log("@$# deleteExpense", req.body, "params", req.params);
            const deleteExpense = yield this.expenseController.deleteExpense(req, res);
            res.json(deleteExpense);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ExpenseRouter;
//# sourceMappingURL=expenseRoutes.js.map
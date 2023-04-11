import express, { Router, Request, Response } from "express";
import { ExpenseController } from "../controllers/expenseController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export default class ExpenseRouter {
  private router: Router;
  private expenseController: ExpenseController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.expenseController = new ExpenseController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/add",
      this.authMiddleware.authenticateToken,
      this.authMiddleware.authorizeRole("admin"),
      this.addExpense.bind(this)
    );

    this.router.get(
      "/list",
      this.authMiddleware.authenticateToken,
      this.listExpense.bind(this)
    );

    this.router.get(
      "/trends",
      this.authMiddleware.authenticateToken,
      this.getTrends.bind(this)
    );

    this.router.put(
      "/update/:id",
      this.authMiddleware.authenticateToken,
      this.authMiddleware.authorizeRole("admin"),
      this.editExpense.bind(this)
    );

    this.router.delete(
      "/delete/:id",
      this.authMiddleware.authenticateToken,
      this.authMiddleware.authorizeRole("admin"),
      this.deleteExpense.bind(this)
    );
  }

  public async addExpense(req: Request, res: Response): Promise<void> {
    const newExpense = await this.expenseController.addExpense(req, res);
    res.json(newExpense);
  }

  public async listExpense(req: Request, res: Response): Promise<void> {
    //no params return all expense
    //?id=id return only for the id
    //?start_date=...&end_date=... return on date range
    console.log("@$# listExpense", req.body, "params", req.query);
    const allExpenses = await this.expenseController.getAllExpenses(req, res);
    res.json(allExpenses);
  }

  public async getTrends(req: Request, res: Response): Promise<void> {
    // GET /trends: Retrieves spending trends for the current user
    console.log("@$# getTrends", req.body, "params", req.params);
  }

  public async editExpense(req: Request, res: Response): Promise<void> {
    // PUT /expenses/:id: Updates a specific expense by ID for any user
    // console.log("@$# editExpense", req.body, "params", req.params);

    const updateExpense = await this.expenseController.editExpense(req, res);
    res.json(updateExpense);
  }

  public async deleteExpense(req: Request, res: Response): Promise<void> {
    // DELETE /expenses/:id: Deletes a specific expense by ID for any user
    console.log("@$# deleteExpense", req.body, "params", req.params);
  }

  public getRouter(): Router {
    return this.router;
  }
}

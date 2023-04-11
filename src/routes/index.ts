import { Router } from "express";
import UserRouter from "./userRoutes";
import { AuthRouter } from "./authRoutes";
import ExpenseRouter from "./expenseRoutes";

const router = Router();

router.use("/user", new UserRouter().getRouter());
router.use("/auth", new AuthRouter().getRouter());
router.use("/expense", new ExpenseRouter().getRouter());

export default router;

import { Router } from "express";
import UserRouter from "./userRoutes";
import { AuthRouter } from "./authRoutes";

const router = Router();

router.use("/users", new UserRouter().getRouter());
router.use("/auth", new AuthRouter().getRouter());

export default router;

import { Router } from "express";
import UserRouter from "./userRoutes";

const router = Router();

router.use("/users", new UserRouter().getRouter());

export default router;

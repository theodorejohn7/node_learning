"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRoutes_1 = require("./authRoutes");
const expenseRoutes_1 = __importDefault(require("./expenseRoutes"));
const router = (0, express_1.Router)();
router.use("/user", new userRoutes_1.default().getRouter());
router.use("/auth", new authRoutes_1.AuthRouter().getRouter());
router.use("/expense", new expenseRoutes_1.default().getRouter());
exports.default = router;
//# sourceMappingURL=index.js.map
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
const userController_1 = require("../controllers/userController");
class UserRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new userController_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/list-all", this.getAllUsers.bind(this));
        this.router.post("/signup", this.createUser.bind(this));
        this.router.put("/reset-password", this.resetPassword.bind(this));
        this.router.delete("/delete/:email", this.deleteUser.bind(this));
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userController.getAllUsers(req, res);
            res.json(users);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userController.createUser(req, res);
            res.json(user);
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reset = yield this.userController.resetPassword(req, res);
            res.json(reset);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("@$# req", req.params.email);
            const deleteUser = yield this.userController.deleteUser(req, res);
            res.json(deleteUser);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRouter;
//# sourceMappingURL=userRoutes.js.map
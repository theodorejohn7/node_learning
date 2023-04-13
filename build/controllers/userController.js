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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const authService_1 = require("../services/authService");
const userDao_1 = require("../dao/userDao");
const user_1 = __importDefault(require("../models/user"));
const joi_1 = __importDefault(require("joi"));
class UserController {
    constructor() {
        this.userDao = new userDao_1.UserDao(user_1.default);
        this.authService = new authService_1.AuthService();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSchema = joi_1.default.object({
                name: joi_1.default.string().required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
                securityQuestion: joi_1.default.required(),
                securityAnswer: joi_1.default.required(),
            });
            const { error, value } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            // const user = req.body;
            try {
                const createdUser = yield userService_1.userService.createUser(value);
                res.status(201).json(createdUser);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to create user" });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.userService.getAllUsers();
                res.json(users);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to get users" });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.body;
                const resetDetails = yield userService_1.userService.resetPassword(userDetails);
                res.status(201).json(resetDetails);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.email;
                const deleteUser = yield userService_1.userService.deleteUser(email);
                res.json(deleteUser);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete user " });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map
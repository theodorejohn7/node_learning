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
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userDao_1 = require("../dao/userDao");
const user_1 = __importDefault(require("../models/user"));
class AuthService {
    constructor() {
        this.userDao = new userDao_1.UserDao(user_1.default);
    }
    static generateToken(payload) {
        const token = (0, jsonwebtoken_1.sign)(payload, this.secret);
        return token;
    }
    static generateAccessToken(payload) {
        const accessToken = (0, jsonwebtoken_1.sign)({ userId: payload._id, role: payload.role }, process.env.ACCESS_TOKEN_SECRET || this.secret, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" });
        return accessToken;
    }
    static generateRefreshToken(payload) {
        const refreshToken = (0, jsonwebtoken_1.sign)({ userId: payload._id, role: payload.role }, process.env.REFRESH_TOKEN_SECRET || this.secret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" });
        return refreshToken;
    }
    static verifyToken(token) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, this.secret);
            return decoded;
        }
        catch (err) {
            return null;
        }
    }
    loginUser(loginData, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = loginData;
                const isValidUser = yield this.userDao.findUserByEmail(email);
                const isValidPassword = yield this.userDao.findUserByEmailAndPassword(email, password);
                if (!isValidPassword || !isValidUser) {
                    throw new Error("Invalid email or password");
                }
                const accessToken = AuthService.generateAccessToken(isValidUser);
                const refreshToken = AuthService.generateRefreshToken(isValidUser);
                yield this.userDao.storeRefreshToken(isValidUser, refreshToken);
                return { email, accessToken, refreshToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthService = AuthService;
AuthService.secret = "mY-$eCrEt";
//# sourceMappingURL=authService.js.map
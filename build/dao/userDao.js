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
exports.userDao = exports.UserDao = void 0;
const user_1 = __importDefault(require("../models/user"));
const user_2 = __importDefault(require("../models/user"));
class UserDao {
    constructor(userModel) {
        this.userModel = user_1.default;
        this.userModel = userModel;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield user_1.default.create(user);
            return createdUser.toObject();
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ email });
            return user ? user.toObject() : null;
        });
    }
    findUserByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ email, password });
            return user ? user.toObject() : null;
        });
    }
    storeRefreshToken(user, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.userModel
                    .findOneAndUpdate({ _id: user }, { refreshToken }, { new: true })
                    .lean();
                return updatedUser;
            }
            catch (error) {
                console.error("Error storing refresh token:", error);
                throw new Error("Error storing refresh token");
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find().exec();
            return users.map((user) => user.toObject());
        });
    }
    resetPassword(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword, securityQuestion, securityAnswer } = userDetails;
            const user = yield user_2.default.findOne({
                email,
                securityQuestion,
                securityAnswer,
            });
            if (!user) {
                throw new Error("Invalid email, security question, or security answer.");
            }
            user.password = newPassword;
            yield user.save();
            return { message: "Password reset successfully." };
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_2.default.findOneAndDelete({ email: email });
                if (deletedUser) {
                    return { message: `${deletedUser.email} User deleted Successfully ` };
                }
            }
            catch (error) {
                throw new Error("Error Deleting User");
            }
        });
    }
}
exports.UserDao = UserDao;
exports.userDao = new UserDao(user_1.default);
//# sourceMappingURL=userDao.js.map
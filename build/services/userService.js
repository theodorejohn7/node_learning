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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const userDao_1 = require("../dao/userDao");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return userDao_1.userDao.createUser(user);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userDao_1.userDao.getAllUsers();
        });
    }
    resetPassword(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return userDao_1.userDao.resetPassword(userDetails);
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return userDao_1.userDao.deleteUser(email);
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DbConnect {
    constructor() {
        this.dbUrl = process.env.MONGODB_URL || "";
        // this.connectDB();
    }
    connectDB() {
        mongoose_1.default
            .connect(this.dbUrl)
            .then(() => console.log("MongoDB connected"))
            .catch((err) => console.error(err));
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB connection error:"));
        db.once("open", () => {
            console.log("Connected to MongoDB");
        });
    }
}
exports.dbConnect = new DbConnect();
//# sourceMappingURL=db.js.map
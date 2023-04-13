"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class LoggerService {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: "info",
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
            defaultMeta: { service: "Expense Tracker" },
            transports: [
                new winston_1.transports.File({
                    filename: "logs/error.log",
                    level: "error",
                }),
                new winston_1.transports.File({
                    filename: "logs/combined.log",
                }),
            ],
        });
    }
    serviceName(message) {
        this.logger.defaultMeta.service = message;
    }
    debug(message, data) {
        this.logger.debug(message, data);
    }
    info(message, data) {
        this.logger.info(message, data);
    }
    warn(message, data) {
        this.logger.warn(message, data);
    }
    error(message, error) {
        console.log("@$# error", error);
        this.logger.error(message, { error });
    }
    handleException() {
        process.on("uncaughtException", (error) => {
            this.logger.error("Uncaught Exception", { error });
            process.exit(1);
        });
        process.on("unhandledRejection", (reason, promise) => {
            this.logger.error("Unhandled Rejection", { reason, promise });
        });
    }
}
exports.default = LoggerService;
//# sourceMappingURL=logger.config.js.map
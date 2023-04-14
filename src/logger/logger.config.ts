import { createLogger, format, transports, Logger } from "winston";
import fs from 'fs';


export default class LoggerService {
  private logger: Logger;

  constructor() {
    const logDir = 'logs';

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir,{recursive:true});
    }
    

    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: "Expense Tracker" },
      transports: [
        new transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new transports.File({
          filename: "logs/combined.log",
        }),
      ],
    });
  }

  public serviceName(message: string) {
    this.logger.defaultMeta.service = message;
  }

  public debug(message: string, data?: any) {
    this.logger.debug(message, data);
  }

  public info(message: string, data?: any) {
    this.logger.info(message, data);
  }

  public warn(message: string, data?: any) {
    this.logger.warn(message, data);
  }

  public error(message: string, error?: any) {
    console.log("@$# error", error)
    this.logger.error(message, { error });
  }

  public handleException() {
    process.on("uncaughtException", (error) => {
      this.logger.error("Uncaught Exception", { error });
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      this.logger.error("Unhandled Rejection", { reason, promise });
    });
  }
}

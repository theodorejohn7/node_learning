import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { dbConnect } from "./utils/db"; 
import router from "./routes";
import routes from "./routes";

import UserRouter from "./routes/userRoutes"

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.connectToDatabase();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    const userRouter = new UserRouter();
 
    this.app.use(routes);

  }

  private connectToDatabase(): void {
  
    dbConnect.connectDB();

    const port = process.env.PORT_NO || 3777;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  }
}

export default new App().app;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class DbConnect {
  private dbUrl: string;

  constructor() {
    this.dbUrl = process.env.MONGODB_URL || "";
    // this.connectDB();
  }

  public connectDB(): void {
    mongoose
      .connect(this.dbUrl)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
  }
}

export const dbConnect = new DbConnect();
 
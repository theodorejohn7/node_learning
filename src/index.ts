import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
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
    this.app.use('/users', userRoutes);
  }

  private connectToDatabase(): void {
    const dbUrl = process.env.MONGODB_URL || '' ;
    // mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("@$#dbURL", dbUrl)
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    const port =process.env.PORT_NO || 3777;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
    this.app.listen(7000, () => {
      console.log(`Server running on port ${7000}`);
    });
  }


}

export default new App().app;

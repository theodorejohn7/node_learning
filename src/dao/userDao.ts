import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const UserModel = mongoose.model('User', userSchema);

  class UserDao {
    
    async createUser(user: any): Promise<any> {
      const createdUser = await UserModel.create(user);
      return createdUser.toObject();
    }

    async getAllUsers(): Promise<any[]> {
        const users = await UserModel.find().exec();
        return users.map((user) => user.toObject());
      }
 

}
export const userDao = new UserDao();





// import  User  from '../models/user';
// import { MongoClient, Db, Collection } from 'mongodb';

// export class UserDao {
//   private readonly url: string;
//   private readonly dbName: string;
//   private db: Db;
//   private users: Collection<typeof User>;

//   constructor() {
//     this.url = process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp';
//     this.dbName = process.env.DB_NAME || 'myapp';
//   }

//   async connect() {
//     const client = await MongoClient.connect(this.url);
//     console.log(`Connected to MongoDB at ${this.url}`);
//     this.db = client.db(this.dbName);
//     this.users = this.db.collection<typeof User>('users');
//   }

//   async createUser(user: typeof User): Promise<typeof User> {
//     const result = await this.users.insertOne(user);
//     return result.ops[0];
//   }
// }

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

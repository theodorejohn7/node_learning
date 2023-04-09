import { Schema, model, Document } from 'mongoose';

export interface UserAttributes {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserAttributes, Document {}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel; 



// import { Schema, model, Document } from 'mongoose';

// interface UserAttributes {
//   name: string;
//   email: string;
//   password: string;
// }

// interface UserDocument extends UserAttributes, Document {}

// const userSchema = new Schema<UserDocument>({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const UserModel = model<UserDocument>('User', userSchema);

// export default UserModel;



// import { Schema, model, Document } from 'mongoose';
// interface UserAttributes {
 
//   name: string;
//   email: string;
//   password: string;
// }

// export interface UserDocument extends UserAttributes, Document {}

// const userSchema = new Schema<UserDocument>({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

//  const User = model<UserDocument>('User', userSchema);

//  export default User;
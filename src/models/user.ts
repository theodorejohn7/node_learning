import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  name: string;
  email: string;
  password: string;
  refreshToken?: string; 
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
  refreshToken: {   
    type: String,
    default: undefined,
  },
});

userSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel; 


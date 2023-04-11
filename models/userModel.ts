import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  avaterID: string;
}

const UserSchema = new Schema<User>();

const UserModel = model<User>("User", UserSchema);

export default UserModel;

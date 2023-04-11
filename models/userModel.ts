import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  avater: string;
}

const UserSchema = new Schema<User>();

const UserModel = model<User>("User", UserSchema);

export default UserModel;

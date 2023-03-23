import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: [true, "Pleace add an emial"],
  },
  password: {
    type: String,
    required: [true, "Pleace add a password"],
  },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;

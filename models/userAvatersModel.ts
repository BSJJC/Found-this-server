import { Schema, model } from "mongoose";

interface UserAvater {
  userAvater: string;
}

const UserAvaterSchema = new Schema<UserAvater>({
  userAvater: {
    type: String,
  },
});

const UserAvaterModel = model<UserAvater>("UserAvaters", UserAvaterSchema);

export default UserAvaterModel;

import { Schema, model } from "mongoose";

interface UserAvater {
  binaryString: string;
}

const UserAvaterSchema = new Schema<UserAvater>({
  binaryString: {
    type: String,
  },
});

const UserAvaterModel = model<UserAvater>("UserAvaters", UserAvaterSchema);

export default UserAvaterModel;

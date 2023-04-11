import { Schema, model } from "mongoose";

interface UserAvater {}

const UserAvaterSchema = new Schema<UserAvater>();

const UserAvaterModel = model<UserAvater>("UserAvaters", UserAvaterSchema);

export default UserAvaterModel;

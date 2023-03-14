import { Schema, model } from "mongoose";

interface AdministratorAvater {
  fileId: String;
}

const administratorAvaterSchema = new Schema<AdministratorAvater>();

const administratorAvaterModel = model<AdministratorAvater>(
  "AdministratorAvater",
  administratorAvaterSchema
);

export default administratorAvaterModel;

import { Schema, model } from "mongoose";

interface platformModel {
  title: string;
  intro: string;
}

const platformModelSchema = new Schema<platformModel>({
  title: {
    type: String,
    unique: true,
    required: [true, "Pleace add a model name"],
  },
  intro: {
    type: String,
    required: [true, "Pleace add a intro"],
  },
});

const platformModel = model<platformModel>(
  "platformModel",
  platformModelSchema
);

export default platformModel;

import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

import type commentType from "../types/commentType";

interface topicModel {
  founder: string;
  title: string;
  text: string;
  appendixIds: Array<string>;
  isDeleted: boolean;
}

const topicModelSchema = new Schema<topicModel>();

const topicModel = model<topicModel>("topicModel", topicModelSchema);

export default topicModel;

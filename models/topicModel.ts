import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

import type commentType from "../types/commentType";

interface topicModel {
  founder: string;
  title: string;
  intro: string;
  text: string;
  appendixId: ObjectId;
  belong: ObjectId;
  isDeleted: boolean;
  replies: commentType[];
}

const topicModelSchema = new Schema<topicModel>({
  founder: {
    type: String,
    required: [true, "Pleace add the founder"],
  },
  title: {
    type: String,
    required: [true, "Pleace add a title"],
  },
  intro: {
    type: String,
    required: [true, "Pleace add an intro"],
  },
  text: {
    type: String,
    required: [true, "Pleace add the text"],
  },
  appendixId: {
    type: ObjectId,
    required: [false, ""],
  },
  belong: {
    type: ObjectId,
    required: [true, "Pleace declear what model does this topic belongs to"],
  },
  isDeleted: {
    type: Boolean,
    required: [true, "Pleace declear if this topic is deleted"],
  },
  replies: {
    type: [],
    required: [false, ""],
  },
});

const topicModel = model<topicModel>("topicModel", topicModelSchema);

export default topicModel;

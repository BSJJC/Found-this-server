import { Schema, model } from "mongoose";

interface topicBgModel {}

const topicBgModelSchema = new Schema<topicBgModel>({});

const topicBgModel = model<topicBgModel>("topicModel", topicBgModelSchema);

export default topicBgModel;

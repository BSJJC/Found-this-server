import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicModel from "../models/topicModel";
import platformModel from "../models/platformModelsModel";

const getTopics = asyncHandler(async (req: Request, res: Response) => {});

const createTopic = asyncHandler(async (req: Request, res: Response) => {
  const { founder, title, intro, text, appendixId, belong } = req.body;

  res.json({ founder, title, intro, text, appendixId, belong });
});

export { createTopic };

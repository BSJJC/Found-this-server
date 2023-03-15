import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import platformModel from "../models/platformModelsModel";

const registerModel = asyncHandler(async (req: Request, res: Response) => {
  const { title, intro } = req.body;

  const platformModelExists = await platformModel.findOne({ title });
  if (platformModelExists) {
    res.status(400);
    throw new Error("Administrator already exists");
  }

  const newPlatformModel = await platformModel.create({
    title,
    intro,
  });

  if (newPlatformModel) {
    res.status(200).json({
      _id: newPlatformModel.id,
      title,
      intro,
    });
  } else {
    res.status(400);
    throw new Error("Invalid model data");
  }
});

const deleteModel = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const theDeleted = await platformModel.deleteMany({
    title: { $in: title },
  });
  res.status(200).json({
    theDeleted,
  });
});

export { registerModel, deleteModel };

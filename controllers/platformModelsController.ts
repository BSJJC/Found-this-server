import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import platformModel from "../models/platformModelsModel";

/**
 * @desc            Get all models
 * @route           GET /api/platformModel/getModels
 * @access        Public
 */
const getModels = asyncHandler(async (req: Request, res: Response) => {
  const models = await platformModel.find();

  res.status(200).json(models);
});

/**
 * @desc            Register new model
 * @route           GET /api/platformModel/addModel
 * @access        Public
 */
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
      title,
      intro,
    });
  } else {
    res.status(400);
    throw new Error("Invalid model data");
  }
});

/**
 * @description          Delete model
 * @route                     DELETE /api/platformModel/deleteModel
 * @access                 Public
 */
const deleteModel = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const theDeleted = await platformModel.deleteMany({
    title: { $in: title },
  });
  res.status(200).json({
    theDeleted,
  });
});

export { getModels, registerModel, deleteModel };

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserAvaterModel from "../models/userAvatersModel";

/**
 * @description          Upload new user avater
 * @route                     POST /api/userAvater/upload
 * @access                 Public
 */
const uploadUserAvater = asyncHandler(async (req: Request, res: Response) => {
  const { binaryString } = req.body;

  const avater = await UserAvaterModel.create({
    binaryString: binaryString,
  });

  if (avater) {
    res.status(200).json({
      binaryString,
    });
  } else {
    res.status(400);
    throw new Error("avater upload failed");
  }
});

/**
 * @desc            Get user avater
 * @route           GET /api/userAvater/get
 * @access        Public
 */
const getUserAvater = asyncHandler(async (req: Request, res: Response) => {
  const binaryString = await UserAvaterModel.findById(req.body.userAvater.id);

  res.status(200).json({
    binaryString,
  });
});

export { uploadUserAvater, getUserAvater };

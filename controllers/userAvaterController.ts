import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserAvaterModel from "../models/userAvatersModel";
import {
  Db,
  GridFSBucket,
  GridFSBucketWriteStream,
  MongoClient,
} from "mongodb";

/**
 * @description          Upload new user avater
 * @route                     POST /api/userAvater/upload
 * @access                 Public
 */
const uploadUserAvater = asyncHandler(async (req: Request, res: Response) => {
  try {
    const client: MongoClient = await MongoClient.connect(
      process.env.MONGO_URI as string
    );
    const db: Db = client.db();
    const fileBucket: GridFSBucket = new GridFSBucket(db, {
      bucketName: "userAvaters",
    });

    const file: Express.Multer.File = req.body
      .userAvater as Express.Multer.File;

    console.log(file);

    const buffer: Buffer = file.buffer;
    const uploadStream: GridFSBucketWriteStream = fileBucket.openUploadStream(
      file.originalname
    );

    uploadStream.end(buffer);
    res.json({
      msg: "new avater upload done",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading appendix");
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

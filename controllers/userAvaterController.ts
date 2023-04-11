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

const uploadAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client: MongoClient = await MongoClient.connect(
        process.env.MONGO_URI as string
      );
      const db: Db = client.db();
      const imagesBucket: GridFSBucket = new GridFSBucket(db, {
        bucketName: "administratorAvaters",
      });

      const file: Express.Multer.File = req.file as Express.Multer.File;
      const buffer: Buffer = file.buffer;
      const uploadStream: GridFSBucketWriteStream =
        imagesBucket.openUploadStream(file.originalname);
      uploadStream.end(buffer);
      res.send("administrtor avater uploaded successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading image");
    }
  }
);

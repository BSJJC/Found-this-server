import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  Db,
  GridFSBucket,
  GridFSBucketReadStream,
  GridFSBucketWriteStream,
  MongoClient,
  ObjectId,
} from "mongodb";
import UserAvaterModel from "../models/userAvatersModel";

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

    const file: Express.Multer.File = req.file as Express.Multer.File;
    const buffer: Buffer = file.buffer;

    const uploadStream: GridFSBucketWriteStream = fileBucket.openUploadStream(
      file.originalname
    );

    uploadStream.end(buffer);

    res.json({
      msg: "new avater upload done",
      id: uploadStream.id,
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
  try {
    const client: MongoClient = await MongoClient.connect(
      process.env.MONGO_URI as string
    );

    const db: Db = client.db();
    const fileBucket: GridFSBucket = new GridFSBucket(db, {
      bucketName: "userAvaters",
    });
    const fileId: ObjectId = new ObjectId(req.params.id);
    const downloadStream: GridFSBucketReadStream =
      fileBucket.openDownloadStream(fileId);

    let fileData = Buffer.from([]);

    downloadStream.on("data", (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });

    downloadStream.on("end", () => {
      const base64Data = fileData.toString("base64");
      res.set({
        "Content-Type": "application/octet-stream",
      });

      res.send(base64Data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetch appendix");
  }
});

export { uploadUserAvater, getUserAvater };

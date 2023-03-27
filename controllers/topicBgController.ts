import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  MongoClient,
  GridFSBucket,
  ObjectId,
  Db,
  GridFSBucketWriteStream,
  GridFSBucketReadStream,
} from "mongodb";
import asyncHandler from "express-async-handler";
dotenv.config();

/**
 * @desc            Upload topic background
 * @route           POST /api/topicBackground/upload
 * @access        Public
 */
const uploadTopicBackground = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client: MongoClient = await MongoClient.connect(
        process.env.MONGO_URI as string
      );
      const db: Db = client.db();
      const imagesBucket: GridFSBucket = new GridFSBucket(db, {
        bucketName: "topicBackground",
      });

      const file: Express.Multer.File = req.file as Express.Multer.File;
      const buffer: Buffer = file.buffer;
      const uploadStream: GridFSBucketWriteStream =
        imagesBucket.openUploadStream(file.originalname);
      uploadStream.end(buffer);
      res.send("topic background ploaded successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading topic background");
    }
  }
);

/**
 * @desc            Get topic background
 * @route           GET /api/topicBackground/:topicBackgroundId
 * @access        Public
 */
const getTopicBackground = asyncHandler(async (req: Request, res: Response) => {
  try {
    const client: MongoClient = await MongoClient.connect(
      process.env.MONGO_URI as string
    );

    const db: Db = client.db();
    const imagesBucket: GridFSBucket = new GridFSBucket(db, {
      bucketName: "topicBackground",
    });

    const imageId: ObjectId = new ObjectId(req.params.topicBackgroundId);

    const downloadStream: GridFSBucketReadStream =
      imagesBucket.openDownloadStream(imageId);
    res.set("Content-Type", "image/jpeg");
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetch topic background");
  }
});

export { uploadTopicBackground, getTopicBackground };

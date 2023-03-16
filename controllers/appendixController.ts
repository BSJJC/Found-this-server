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

const uploadAppendix = asyncHandler(async (req: Request, res: Response) => {
  try {
    const client: MongoClient = await MongoClient.connect(
      process.env.MONGO_URI as string
    );
    const db: Db = client.db();
    const fileBucket: GridFSBucket = new GridFSBucket(db, {
      bucketName: "appendix",
    });

    const file: Express.Multer.File = req.file as Express.Multer.File;
    const buffer: Buffer = file.buffer;
    const uploadStream: GridFSBucketWriteStream = fileBucket.openUploadStream(
      file.originalname
    );
    uploadStream.end(buffer);
    res.send("Appendix uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading appendix");
  }
});

const getAppendix = asyncHandler(async (req: Request, res: Response) => {
  try {
    const client: MongoClient = await MongoClient.connect(
      process.env.MONGO_URI as string
    );
    const db: Db = client.db();
    const fileBucket: GridFSBucket = new GridFSBucket(db, {
      bucketName: "appendix",
    });
    const fileId: ObjectId = new ObjectId(req.params.fileId);
    const downloadStream: GridFSBucketReadStream =
      fileBucket.openDownloadStream(fileId);

    let fileData = Buffer.from([]);

    downloadStream.on("data", (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });

    downloadStream.on("end", () => {
      const base64Data = fileData.toString("base64");

      // Set the response headers
      res.set({
        "Content-Type": "application/octet-stream",
      });

      // Send the base64-encoded file as the response body
      res.send(base64Data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetch appendix");
  }
});

export { uploadAppendix, getAppendix };

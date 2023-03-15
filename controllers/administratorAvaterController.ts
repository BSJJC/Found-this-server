import { Request, Response } from "express";
import {
  MongoClient,
  GridFSBucket,
  ObjectId,
  Db,
  GridFSBucketWriteStream,
  GridFSBucketReadStream,
} from "mongodb";
import asyncHandler from "express-async-handler";

require("dotenv").config();

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

const getAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client: MongoClient = await MongoClient.connect(
        process.env.MONGO_URI as string
      );

      const db: Db = client.db();
      const imagesBucket: GridFSBucket = new GridFSBucket(db, {
        bucketName: "administratorAvaters",
      });

      const imageId: ObjectId = new ObjectId(req.params.administratorAvaterId);

      const downloadStream: GridFSBucketReadStream =
        imagesBucket.openDownloadStream(imageId);
      res.set("Content-Type", "image/jpeg");
      downloadStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetch administrator avater");
    }
  }
);

export { uploadAdministratorAvater, getAdministratorAvater };

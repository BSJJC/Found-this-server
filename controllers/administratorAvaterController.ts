import { Request, Response } from "express";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";

require("dotenv").config();

const uploadAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI as string);
      const db = client.db();
      const imagesBucket = new GridFSBucket(db, {
        bucketName: "administratorAvaters",
      });

      const file = req.file as Express.Multer.File;
      const buffer = file.buffer;
      const uploadStream = imagesBucket.openUploadStream(file.originalname);
      uploadStream.end(buffer);
      res.send("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading image");
    }
  }
);

const getAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI as string);

      const db = client.db();
      const imagesBucket = new GridFSBucket(db, {
        bucketName: "administratorAvaters",
      });

      const imageId: ObjectId = new ObjectId(req.params.administratorAvaterId);

      console.log(imageId);

      const downloadStream = imagesBucket.openDownloadStream(imageId);
      res.set("Content-Type", "image/jpeg");
      downloadStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error downloading image");
    }
  }
);

export { uploadAdministratorAvater, getAdministratorAvater };

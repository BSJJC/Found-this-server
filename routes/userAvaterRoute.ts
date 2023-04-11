import { Router } from "express";
import {
  uploadUserAvater,
  getUserAvater,
} from "../controllers/userAvaterController";
import multer from "multer";

const upload = multer();
const userAvaterRouter = Router();

userAvaterRouter.post(
  "/upload",
  upload.single("userAvaters"),
  uploadUserAvater
);
userAvaterRouter.get("/:id", getUserAvater);

export default userAvaterRouter;

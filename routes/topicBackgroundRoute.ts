import { Router } from "express";
import multer from "multer";
import {
  uploadTopicBackground,
  getTopicBackground,
} from "../controllers/topicBgController";

const upload = multer();
const topicBackgroundRouter = Router();

topicBackgroundRouter.post(
  "/upload",
  upload.single("topicBackground"),
  uploadTopicBackground
);

topicBackgroundRouter.get("/:topicBackgroundId", getTopicBackground);

export default topicBackgroundRouter;

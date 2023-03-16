import { Router } from "express";
import multer from "multer";
import { uploadAppendix, getAppendix } from "../controllers/appendixController";

const upload = multer();
const appendixRoute = Router();

appendixRoute.get("/:fileId", getAppendix);
appendixRoute.post("/upload", upload.single("file"), uploadAppendix);

export default appendixRoute;

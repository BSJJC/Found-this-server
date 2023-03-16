import { Router } from "express";
import multer from "multer";
import {
  uploadAdministratorAvater,
  getAdministratorAvater,
} from "../controllers/administratorAvaterController";

const upload = multer();
const administratorAvaterRoute = Router();

administratorAvaterRoute.post(
  "/upload",
  upload.single("avater"),
  uploadAdministratorAvater
);

administratorAvaterRoute.get("/:administratorAvaterId", getAdministratorAvater);

export default administratorAvaterRoute;

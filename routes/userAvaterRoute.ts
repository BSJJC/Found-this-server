import { Router } from "express";
import {
  uploadUserAvater,
  getUserAvater,
} from "../controllers/userAvaterController";

const userAvaterRouter = Router();

userAvaterRouter.post("/upload", uploadUserAvater);
userAvaterRouter.get("/get", getUserAvater);

export default userAvaterRouter;

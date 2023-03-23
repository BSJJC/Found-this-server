import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserData,
} from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const userRoutter = Router();

userRoutter.post("/", registerUser);
userRoutter.post("/login", loginUser);
userRoutter.get("/userData", protect, getUserData);

export default userRoutter;

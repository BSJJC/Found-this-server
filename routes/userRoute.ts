import { Router } from "express";
import { registerUser } from "../controllers/userController";

const userRoutter = Router();

userRoutter.post("/", registerUser);

export default userRoutter;

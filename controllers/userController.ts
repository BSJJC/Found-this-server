import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

import UserModel from "../models/userModel";

/**
 * @description          Register new user
 * @route                     POST /api/user
 * @access                 Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id, 1, "d"),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { registerUser };

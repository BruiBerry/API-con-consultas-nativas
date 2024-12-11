import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs"
import { HttpError } from "../utils/httpError.util";

const getAllUsers = async () => {
  const users = await UserModel.findAll();
  return users
};

const getUserbyEmail = async (email: string) => {
  const user = await UserModel.findOneByEmail(email);
  return user
};



const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {

    const user = await UserModel.findOneByEmail(email);

    if (user) {
      throw new HttpError("User already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create(email, hashedPassword);

    return newUser;
};

export const userService = {
  getAllUsers,
  getUserbyEmail,
  createUserWithEmailAndPassword,
};

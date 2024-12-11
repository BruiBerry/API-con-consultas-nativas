import { userService } from "./user.service";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpError.util";

const loginWithEmailAndPasword = async (email: string, password: string) => {
    
    const user = await userService.getUserbyEmail(email);

    if(!user) throw new HttpError("User not found", 400)
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) throw new HttpError("Invalid password", 400);

    const token = generateAccessToken(email, user.id);
    return token
};

const registerWhithEmailAndPasword = async (email: string, password: string) => {

    const newUser = await userService.createUserWithEmailAndPassword(email, password);

    const token = generateAccessToken(email, newUser.id);
    return token;
};

export const authService = {
    loginWithEmailAndPasword,
    registerWhithEmailAndPasword
}
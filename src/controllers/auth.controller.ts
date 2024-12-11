import { Request, Response, NextFunction} from "express";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { HttpError } from "../utils/httpError.util";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const token = await authService.loginWithEmailAndPasword(email, password);
        res.json({token});
    } catch (error) {
        next(error);
    }
  };

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email, password} = req.body
      const token = await authService.registerWhithEmailAndPasword(
        email, 
        password
    );
      res.status(201).json({token})
    } catch (error) {
      next(error);
    }
  };


  export const authController = {
    login,
    register
};
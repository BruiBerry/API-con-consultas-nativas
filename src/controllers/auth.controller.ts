import { Request, Response, NextFunction} from "express";
import { authService } from "../services/auth.service";
import { authLoginSchema } from "../schemas/auth.schemas";
import { HttpError } from "../utils/httpError.util";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error, value} = authLoginSchema.validate(req.body);

        if (error) {
          throw new HttpError(error.message, 400);
        }

        const {email, password} = value
        const token = await authService.loginWithEmailAndPasword(email, password);
        res.json({token});
    } catch (error) {
        next(error);
    }
  };

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error, value} = authLoginSchema.validate(req.body);

        if (error) {
          throw new HttpError(error.message, 400);
        }
        const {email, password} = value
        const token = await authService.registerWhithEmailAndPasword(email, password);
        res.status(201).json({token})
        
    } catch (error) {
      next(error);
    }
  };


  export const authController = {
    login,
    register
};
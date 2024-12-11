import { Request, Response, NextFunction} from "express";
import { userService } from "../services/user.service";



const getUsers = async(req: Request, res: Response, next: NextFunction) => {
    try	{
        const users = await userService.getAllUsers();
        res.json(users)
    } catch (error) {
        next(error);
    }
}

const getUserbyEmail = async(req: Request, res: Response, next: NextFunction) => {
    try	{
        const {email} = req.body
        const user = await userService.getUserbyEmail(email);
        res.json(user)
    } catch (error) {
        next(error);
      }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const newUser = await userService.createUserWithEmailAndPassword(
        email,
        password
      );
      res.json({ newUser });
    } catch (error) {
        next(error);
      }
  };

export const userController = {
    getUsers,
    getUserbyEmail,
    createUser
};
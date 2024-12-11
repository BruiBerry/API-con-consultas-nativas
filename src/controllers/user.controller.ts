import { Request, Response } from "express";
import { userService } from "../services/user.service";



const getUsers = async(req: Request, res: Response ) => {
    try	{
        const users = await userService.getAllUsers();
        res.json(users)
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          } else res.status(500).json({ error: "Error de servidor" });
        
    }
}

const getUserbyEmail = async(req: Request, res: Response ) => {
    try	{
        const {email} = req.body
        const user = await userService.getUserbyEmail(email);
        res.json(user)
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            res.status(500).json({ error: error.message})
        }
        res.status(500).json({ error: "Error interno del servidor"})
        
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const newUser = await userService.createUserWithEmailAndPassword(
        email,
        password
      );
      res.json({ newUser });
    } catch (error) {
      
    }
  };

export const userController = {
    getUsers,
    getUserbyEmail,
    createUser
};
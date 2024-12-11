import {Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http://localhost:3000/api/v1/users

// leer los usuarios
router.get('/all', verifyToken, userController.getUsers);
// leer un unico usuario por id
router.get('/email', userController.getUserbyEmail);
// crear un nuevo usuario
router.post("/create", userController.createUser);
// eliminar un usuario por id  

// actualizar un usuario por id
export default router
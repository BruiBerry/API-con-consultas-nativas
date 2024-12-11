import {Router} from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

// path: http://localhost:3000/api/v1/auth

router.post("/login", authController.login);
router.post("/register", authController.register);

export default router;
import {Router} from "express";
import { bookController } from "../controllers/book.controller";

const router = Router();

// path: http://localhost:3000/api/v1/books

router.get('/all', bookController.getAllBooks);

router.post('/add', bookController.addNewBook);

export default router
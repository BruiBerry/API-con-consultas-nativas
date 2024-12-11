import { Request, Response, NextFunction} from "express";
import { bookService } from "../services/book.service";

 const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const books = await bookService.findAllBooks();
        res.json(books)
     } catch (error) {
        next(error);
     }
 }

 const addNewBook = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const { title, author, genre, total_copies, available_copies } = req.body;
        const newBook = await bookService.addNewBook(
            title, 
            author, 
            genre, 
            total_copies, 
            available_copies);
        res.json(newBook)
     } catch (error) {
        next(error);
     }
 }

 export const bookController = {
    getAllBooks,
    addNewBook
}; 
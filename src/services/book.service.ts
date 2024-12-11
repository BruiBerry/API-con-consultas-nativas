import { bookModel } from "../models/book.model";
import { HttpError } from "../utils/httpError.util";

const findAllBooks = async () => {
    const books = await bookModel.allBooks();
    return books
}

const addNewBook = async (
    title: string, 
    author: string, 
    genre: string, 
    total_copies: number,
    available_copies: number
) => {

    const book = await bookModel.findOneByTitle(title, author);
    if (book) {
        throw new HttpError("Book already exists", 400);
      }
    const newBook = await bookModel.addBook(title, author, genre, total_copies, available_copies); 
    return newBook;
}

export const bookService = {
    addNewBook,
    findAllBooks
}
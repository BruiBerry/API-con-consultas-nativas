import { pool } from "../config/database";
import { IBook } from "../interfaces/books.interface";


const allBooks = async () => {
  const { rows } = await pool.query("SELECT * FROM BOOKS");
  return rows as IBook[];
}

const findOneByTitle = async (title: string, author: string) => {
  // Datos parametrizados
  const query = {
    text: `
    SELECT * FROM BOOKS
    WHERE title = $1 AND author = $2;
    `,
    values: [title, author],
  };

  const { rows } = await pool.query(query);

  return rows[0] as IBook; // ORM
};

const addBook = async (
  title: string, 
  author: string, 
  genre: string, 
  total_copies: number,
  available_copies: number
) => {
    const query = {
      text: `
      INSERT INTO BOOKS (title, author, genre, total_copies, available_copies)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      values: [title, author, genre, total_copies, available_copies],
    };
  
    const { rows } = await pool.query(query);
  
    return rows[0] as IBook;
  };

const deleteBook = async () => {
  
}
export const bookModel = {
  addBook,
  findOneByTitle,
  allBooks
}
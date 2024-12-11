import { pool } from "../config/database";
import { IBook } from "../interfaces/books.interface";


const create = async (email: string, password: string) => {
    const query = {
      text: `
      INSERT INTO BOOKS (title, author, genre, total_copies, avalible_copies)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      values: [email, password],
    };
  
    const { rows } = await pool.query(query);
  
    return rows[0] as IBook;
  };

export const booksModel = {
    create
}
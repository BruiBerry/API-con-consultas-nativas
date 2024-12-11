CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS USERS;

DROP TABLE IF EXISTS BOOKS;

DROP TABLE IF EXISTS LOANS;

CREATE TABLE USERS (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);


CREATE TABLE BOOKS (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100),
    genre VARCHAR(50), -- Fiction, Non-fiction, etc.
    total_copies INT DEFAULT 1 NOT NULL, -- Total copies in the library
    available_copies INT DEFAULT 1 NOT NULL, -- Copies currently available for borrowing
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE LOANS (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id UUID NOT NULL,
    book_id UUID NOT NULL,
    loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the loan was made
    due_date TIMESTAMP NOT NULL, -- When the book should be returned
    return_date TIMESTAMP, -- When the book was actually returned
    status VARCHAR(50) DEFAULT 'borrowed', -- Borrowed, returned, overdue
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
);
CREATE DATABASE PSLibrary


USE PSLibrary

SELECT * FROM INFORMATION_SCHEMA.TABLES

SELECT * FROM PSLibrary



CREATE TABLE books (
    title VARCHAR(255),
    author VARCHAR(255)
);

ALTER TABLE books
ADD id INT;

INSERT INTO books (id, title, author) VALUES
(1, 'War and peace', 'author1'),
(2, 'libro2', 'author2'),
(3, 'War libro 3', 'author3'),
(4, 'War libro 4', 'author4'),
(5, 'War libro 5', 'author5')

SELECT * FROM books


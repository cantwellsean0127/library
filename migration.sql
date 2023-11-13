CREATE DATABASE library;

\c library

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50)
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author_id INTEGER REFERENCES authors(id),
    publication_year INT
);

INSERT INTO authors (fullname) VALUES ('Dr. Suess');
INSERT INTO books (title, author_id, publication_year) VALUES ('The Cat in the Hat', 1, 1957);
INSERT INTO books (title, author_id, publication_year) VALUES ('How the Grinch Stole Christmas', 1, 1957);
INSERT INTO books (title, author_id, publication_year) VALUES ('Green Eggs and Ham', 1, 1960);
INSERT INTO books (title, author_id, publication_year) VALUES ('The Lorax', 1, 1971);
INSERT INTO books (title, author_id, publication_year) VALUES ('One fish, two fish, red fish, blue fish', 1, 1960);
INSERT INTO books (title, author_id, publication_year) VALUES ('Oh, the Places You''ll Go!', 1, 1990);
INSERT INTO books (title, author_id, publication_year) VALUES ('Horton Hears a Who!', 1, 1954);
INSERT INTO books (title, author_id, publication_year) VALUES ('Dr. Seuss''s ABC', 1, 1960);
INSERT INTO books (title, author_id, publication_year) VALUES ('The Sneetches and Other Stories', 1, 1953);
INSERT INTO books (title, author_id, publication_year) VALUES ('Fox in Socks', 1, 1965);
INSERT INTO books (title, author_id, publication_year) VALUES ('And to Think That I Saw it on Mulberry Street', 1, 1937);
INSERT INTO books (title, author_id, publication_year) VALUES ('Hop on Pop', 1, 1963);

INSERT INTO authors (fullname) VALUES ('J.K. Rowling');
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Sorcer''s Stone', 2, 1997);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Chamber of Secrets', 2, 1998);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Prisoner of Azkaban', 2, 1999);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Goblet of Fire', 2, 2000);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Order of the Phoenix', 2, 2003);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Half-Blood Prince', 2, 2005);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Deathly Hallows', 2, 2007);
INSERT INTO books (title, author_id, publication_year) VALUES ('Harry Potter and the Cursed Child', 2, 2016);

-- Active: 1709007112642@@147.139.210.135@5432@muhabby01@public

-- RECIPE TABLE
CREATE TABLE recipe (
    id VARCHAR UNIQUE PRIMARY KEY, title VARCHAR NOT NULL, ingredient TEXT NOT NULL, photo VARCHAR DEFAULT NULL, created_at DATE
)

INSERT INTO
    recipe (
        id, title, ingredient, photo, created_at
    )
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'egg yolk', 'egg, salt, oil', 'https://placehold.co/600x400', NOW()
    );

ALTER TABLE recipe ADD COLUMN updated_at TIMESTAMP;

ALTER TABLE recipe ALTER COLUMN created_at TYPE TIMESTAMP;

UPDATE recipe SET updated_at = NOW();

SELECT title, EXTRACT(
        DAY
        FROM created_at
    ) as create, EXTRACT(
        DAY
        FROM updated_at
    ) as
update
FROM recipe;

SELECT * FROM recipe;

SELECT * FROM recipe WHERE ingredient ILIKE '%egg%';

SELECT * FROM recipe WHERE title LIKE 'fried egg';

SELECT *
FROM recipe
WHERE
    ingredient ILIKE '%egg%'
ORDER BY created_at ASC;

SELECT * FROM recipe ORDER BY created_at DESC LIMIT 3 OFFSET 5;

SELECT COUNT(*) FROM recipe WHERE title ILIKE '%fried%';

SELECT *
FROM recipe
WHERE
    ingredient ILIKE '%egg%'
ORDER BY created_at ASC
LIMIT 3
OFFSET
    5;

-- USER TABLE
CREATE TABLE users (
    user_id VARCHAR UNIQUE PRIMARY KEY, full_name VARCHAR NOT NULL, email VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, profil_picture VARCHAR DEFAULT NULL, about_me TEXT DEFAULT NULL, regist_date TIMESTAMP
)

INSERT INTO
    users
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Muhabby Mulya', 'muhabby@gmail.com', 'asdf1234', 'https://placehold.co/600x400', 'Food Lover', NOW()
    );

SELECT * FROM users;

-- CATEGORY TABLE
CREATE TABLE category (
    id VARCHAR UNIQUE PRIMARY KEY, name VARCHAR NOT NULL, description TEXT NOT NULL, picture VARCHAR DEFAULT NULL, created_at TIMESTAMP, update_at TIMESTAMP
)
-- dessert , main course, appetizer

INSERT INTO
    category
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Desert', 'Makanan penutup atau pencuci mulut, bertujuan untuk menghilangkan kesan dari rasa hidangan sebelumnya.', 'https://placehold.co/600x400', NOW(), NOW()
    );

SELECT * FROM category;
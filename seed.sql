-- Active: 1709007112642@@147.139.210.135@5432@muhabby01

SET timezone = 'Asia/Jakarta';

-- ===========================================
-- RECIPE TABLE
-- ===========================================
CREATE TABLE recipe (
    id VARCHAR UNIQUE PRIMARY KEY, title VARCHAR NOT NULL, ingredient TEXT NOT NULL, photo VARCHAR DEFAULT NULL, created_at TIMESTAMP, updated_at TIMESTAMP
)

INSERT INTO
    recipe (
        id, title, ingredient, photo, created_at, updated_at
    )
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'egg yolk', 'egg, salt, oil', 'https://placehold.co/600x400', NOW(), NOW()
    );

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

-- add category_id to recipe
ALTER TABLE recipe ADD COLUMN category_id INTEGER;

ALTER TABLE recipe
ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category (id);

-- get recipe with category
SELECT * FROM recipe;

SELECT recipe.id, recipe.title, recipe.ingredient, category.name
FROM recipe
    JOIN category ON recipe.category_id = category.id;

-- update category_id in recipe
UPDATE recipe SET category_id = 1;

UPDATE recipe SET category_id = 2 WHERE title ILIKE '%Chicken%';

ALTER TABLE recipe ALTER COLUMN category_id SET NOT NULL;

-- add user_id to recipe
ALTER TABLE recipe ADD COLUMN user_id VARCHAR;

ALTER TABLE recipe
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);

-- get recipe with users
SELECT * FROM recipe;

SELECT recipe.id, recipe.title, recipe.ingredient, category.name AS category, users.full_name AS author
FROM recipe
    JOIN users ON recipe.user_id = users.id
    JOIN category ON recipe.category_id = category.id;

-- update user_id in recipe
UPDATE recipe
SET
    user_id = '9bc8d96a-9a69-4778-a820-91c5abc30ad0'
WHERE
    title ILIKE '%Salad%';

UPDATE recipe
SET
    user_id = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';

ALTER TABLE recipe ALTER COLUMN user_id SET NOT NULL;

-- ===========================================
-- USERS TABLE
-- ===========================================
CREATE TABLE users (
    id VARCHAR UNIQUE PRIMARY KEY, full_name VARCHAR NOT NULL, email VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, profil_picture VARCHAR DEFAULT NULL, bio TEXT DEFAULT NULL, created_at TIMESTAMP, updated_at TIMESTAMP
)

INSERT INTO
    users
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Muhabby Mulya', 'muhabby@gmail.com', 'asdf1234', 'https://placehold.co/600x400', 'Food Lover', NOW(), NOW()
    );

SELECT * FROM users;

-- ===========================================
-- CATEGORY TABLE
-- ===========================================
CREATE TABLE category (
    id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, description TEXT NOT NULL, picture VARCHAR DEFAULT NULL, created_at TIMESTAMP, updated_at TIMESTAMP
)

INSERT INTO
    category (
        name, description, picture, created_at, updated_at
    )
VALUES (
        'Desert', 'Makanan penutup atau pencuci mulut, bertujuan untuk menghilangkan kesan dari rasa hidangan sebelumnya.', 'https://placehold.co/600x400', NOW(), NOW()
    );

SELECT * FROM category;

-- ===========================================
-- AUTH
-- ===========================================
SELECT * FROM users WHERE email = 'abcd1234@gmail.com';

INSERT INTO
    users (
        id, full_name, email, password, bio, created_at
    )
VALUES (
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Muhabby Mulya', 'muhabby@gmail.com', 'asdf1234', 'Food Lover', NOW()
    );

DELETE FROM users WHERE email = 'test@gmail.com';
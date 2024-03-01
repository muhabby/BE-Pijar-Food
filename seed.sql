-- Active: 1709007112642@@147.139.210.135@5432@muhabby01@public
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

DELETE FROM recipe WHERE id = '3e3e4aab-434f-4213-9398-5551d367007f';

SELECT * FROM recipe;

SELECT * FROM recipe WHERE ingredient ILIKE '%egg%';

SELECT * FROM recipe WHERE title LIKE 'fried egg';

SELECT *
FROM recipe
WHERE
    ingredient ILIKE '%egg%'
ORDER BY created_at ASC;

SELECT *
FROM recipe
WHERE
    ingredient ILIKE '%egg%'
ORDER BY updated_at DESC;

SELECT * FROM recipe ORDER BY created_at DESC LIMIT 3;

SELECT * FROM recipe ORDER BY created_at DESC LIMIT 3 OFFSET 5;

SELECT COUNT(*) FROM recipe;

SELECT COUNT(*) FROM recipe WHERE title ILIKE '%fried%';

SELECT *
FROM recipe
WHERE
    ingredient ILIKE '%egg%'
ORDER BY created_at ASC
LIMIT 3
OFFSET
    5;
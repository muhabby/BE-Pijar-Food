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
    )

SELECT * FROM recipe;
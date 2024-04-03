const Pool = require('../config/db')


const showRecipeModel = async () => {
    console.log("model - showRecipe")
    return new Promise((resolve, reject) =>
        Pool.query(`
        SELECT recipe.id, recipe.title, recipe.ingredient, recipe.photo, category.name AS category, users.full_name AS author,
            recipe.created_at, recipe.updated_at
        FROM recipe
            JOIN users ON recipe.user_id = users.id
            JOIN category ON recipe.category_id = category.id
        ORDER BY created_at DESC
        `, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const showRecipeByIdModel = async (id) => {
    console.log("model - showRecipeById")
    return new Promise((resolve, reject) =>
        Pool.query(`
        SELECT recipe.id, recipe.title, recipe.ingredient, recipe.photo, category.name AS category, users.full_name AS author,
            recipe.created_at, recipe.updated_at
        FROM recipe
            JOIN users ON recipe.user_id = users.id
            JOIN category ON recipe.category_id = category.id 
        WHERE recipe.id = '${id}'
        `, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const getRecipeByIdModel = async (id) => {
    console.log("model - getRecipeById")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE id = '${id}'`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const searchRecipeDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, page } = data
    console.log("model - searchRecipeDetail")
    return new Promise((resolve, reject) =>
        Pool.query(`
        SELECT recipe.id, recipe.title, recipe.ingredient, recipe.photo, category.name AS category, users.full_name AS author,
            recipe.created_at, recipe.updated_at
        FROM recipe
            JOIN users ON recipe.user_id = users.id
            JOIN category ON recipe.category_id = category.id
        WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}
        `, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const searchRecipeCountModel = async (data) => {
    let { searchBy, search } = data
    console.log("model - searchRecipeCount")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE ${searchBy} ILIKE '%${search}%'`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const inputRecipeModel = async (data) => {
    console.log("model - inputRecipe")
    let { id, title, ingredient, photo, category_id, user_id } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe (id, title, ingredient, photo, created_at, category_id, user_id) VALUES (
            '${id}', '${title}', '${ingredient}', '${photo}', NOW(), ${category_id}, '${user_id}');`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const updateRecipeModel = async (data) => {
    console.log("model - updateRecipe")
    let { id, title, ingredient, photo, category_id } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE recipe SET title='${title}', ingredient='${ingredient}', photo='${photo}', category_id=${category_id}, updated_at=NOW() WHERE id='${id}';`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const deleteRecipeModel = async (id) => {
    console.log("model - deleteRecipe")
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM recipe WHERE id='${id}';`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

const getCategoryByIdModel = async (id) => {
    console.log("model - getCategoryById")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM category WHERE id = '${id}'`, (err, res) => {
            if (!err) {
                return resolve(res)
            }
            else {
                console.log('error db -', err)
                reject(err)
            }
        })
    )
}

module.exports = { showRecipeModel, showRecipeByIdModel, getRecipeByIdModel, searchRecipeDetailModel, 
    searchRecipeCountModel, inputRecipeModel, updateRecipeModel, deleteRecipeModel, getCategoryByIdModel }
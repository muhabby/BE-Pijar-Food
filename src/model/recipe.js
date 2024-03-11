const Pool = require('../config/db')


const getRecipeModel = async () => {
    console.log("model - getRecipeModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe`, (err, res) => {
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
    console.log("model - getRecipeDetailModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipe WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}`, (err, res) => {
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
    console.log("model - getRecipeDetailCountModel")
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
    console.log("model - getRecipeById")
    let { id, title, ingredient, photo, category_id, user_id } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe (id, title, ingredient, photo, created_at, category_id, user_id) VALUES (
            '${id}', '${title}', '${ingredient}', '${photo}', NOW(), '${category_id}', '${user_id}');`, (err, res) => {
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
    let { id, title, ingredient, photo } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE recipe SET updated_at=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}' WHERE id='${id}';`, (err, res) => {
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

const getUsersByIdModel = async (id) => {
    console.log("model - getUsersById")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE id = '${id}'`, (err, res) => {
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

module.exports = { getRecipeModel, getRecipeByIdModel, searchRecipeDetailModel, searchRecipeCountModel, inputRecipeModel, updateRecipeModel, deleteRecipeModel, getCategoryByIdModel, getUsersByIdModel }
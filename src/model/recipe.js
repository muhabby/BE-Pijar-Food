const Pool = require('../config/db')

const getRecipeModel = async () => {
    console.log("model - getRecipeModel")
    return new Promise((resolve, reject) =>
        Pool.query('SELECT * FROM recipe', (err, res) => {
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

const createRecipe = async (data) => {
    console.log("model - getRecipeById")
    let { id, title, ingredient, photo } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO recipe (id, title, ingredient, photo, created_at) VALUES (
            '${id}', '${title}', '${ingredient}', '${photo}', NOW());`, (err, res) => {
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

const updateRecipe = async (data) => {
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

module.exports = { getRecipeModel, getRecipeByIdModel, createRecipe, updateRecipe }
const Pool = require('../config/db')


const getCategoryModel = async () => {
    console.log("model - getCategoryModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM category`, (err, res) => {
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

const searchCategoryDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, page } = data
    console.log("model - getCategoryDetailModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM category WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}`, (err, res) => {
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

const searchCategoryCountModel = async (data) => {
    let { searchBy, search } = data
    console.log("model - getCategoryDetailCountModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM category WHERE ${searchBy} ILIKE '%${search}%'`, (err, res) => {
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

const inputCategoryModel = async (data) => {
    console.log("model - getCategoryById")
    let { id, name, description, picture } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO category (id, name, description, picture, created_at, updated_at) VALUES (
            '${id}', '${name}', '${description}', '${picture}', NOW(), NOW());`, (err, res) => {
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

const updateCategoryModel = async (data) => {
    console.log("model - updateCategory")
    let { id, name, description, picture } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE category SET updated_at=NOW(), name='${name}', description='${description}', picture='${picture}' WHERE id='${id}';`, (err, res) => {
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

const deleteCategoryModel = async (id) => {
    console.log("model - deleteCategory")
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM category WHERE id='${id}';`, (err, res) => {
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

module.exports = { getCategoryModel, getCategoryByIdModel, searchCategoryDetailModel, searchCategoryCountModel, inputCategoryModel, updateCategoryModel, deleteCategoryModel }
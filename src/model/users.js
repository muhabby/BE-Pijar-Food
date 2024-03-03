const Pool = require('../config/db')


const getUsersModel = async () => {
    console.log("model - getUsersModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users`, (err, res) => {
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

const getUsersByIdModel = async (user_id) => {
    console.log("model - getUsersById")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE user_id = '${user_id}'`, (err, res) => {
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

const searchUsersDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, page } = data
    console.log("model - getUsersDetailModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${page}`, (err, res) => {
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

const searchUsersCountModel = async (data) => {
    let { searchBy, search } = data
    console.log("model - getUsersDetailCountModel")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE ${searchBy} ILIKE '%${search}%'`, (err, res) => {
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

const inputUsersModel = async (data) => {
    console.log("model - getUsersById")
    let { user_id, full_name, email, password, profile_picture, about_me, regist_date } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users (user_id, full_name, email, password, profile_picture, about_me, regist_date) VALUES (
            '${user_id}', '${full_name}', '${email}', '${password}', '${profile_picture}', '${about_me}', NOW());`, (err, res) => {
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

const updateUsersModel = async (data) => {
    console.log("model - updateUsers")
    let { user_id, full_name, email, password, profile_picture, about_me } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE users SET updated_date=NOW(), user_id='${user_id}', full_name='${full_name}', email='${email}', password='${password}', profile_picture='${profile_picture}', about_me='${about_me}'
        WHERE user_id='${user_id}';`, (err, res) => {
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

const deleteUsersModel = async (user_id) => {
    console.log("model - deleteUsers")
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM users WHERE user_id='${user_id}';`, (err, res) => {
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

module.exports = { getUsersModel, getUsersByIdModel, searchUsersDetailModel, searchUsersCountModel, inputUsersModel, updateUsersModel, deleteUsersModel }
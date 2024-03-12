const Pool = require('../config/db')


const showUsersModel = async () => {
    console.log("model - showUsers")
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

const showUsersByIdModel = async (id) => {
    console.log("model - showUsersById")
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

const searchUsersDetailModel = async (data) => {
    let { searchBy, search, sortBy, sort, limit, page } = data
    console.log("model - searchUsersDetail")
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
    console.log("model - searchUsersCount")
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
    console.log("model - inputUsersById")
    let { id, full_name, email, password, profile_picture, bio } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users (id, full_name, email, password, profile_picture, bio, created_at) VALUES (
            '${id}', '${full_name}', '${email}', '${password}', '${profile_picture}', '${bio}', NOW());`, (err, res) => {
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
    let { id, full_name, email, password, profile_picture, bio } = data
    console.log(data)
    return new Promise((resolve, reject) =>
        Pool.query(`UPDATE users SET updated_at=NOW(), id='${id}', full_name='${full_name}', email='${email}', password='${password}', profile_picture='${profile_picture}', bio='${bio}'
        WHERE id='${id}';`, (err, res) => {
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

const deleteUsersModel = async (id) => {
    console.log("model - deleteUsers")
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM users WHERE id='${id}';`, (err, res) => {
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

module.exports = { showUsersModel, showUsersByIdModel, getUsersByIdModel, searchUsersDetailModel, searchUsersCountModel, inputUsersModel, updateUsersModel, deleteUsersModel }
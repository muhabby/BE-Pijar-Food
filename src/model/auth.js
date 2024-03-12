const Pool = require('../config/db')

const getUsersByEmail = async (email) => {
    console.log("model - getUsersByEmail")
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
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

const inputUsers = async (data) => {
    console.log("model - getUsersByEmail")
    let {id, full_name, email, password} =  data
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users (id, full_name, email, password, created_at)
        VALUES ('${id}', '${full_name}', '${email}', '${password}', NOW());`, (err, res) => {
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

module.exports = {getUsersByEmail, inputUsers}
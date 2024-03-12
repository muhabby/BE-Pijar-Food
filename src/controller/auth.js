const { v4: uuidv4 } = require('uuid')
const {
    inputUsers,
    getUsersByEmail
} = require('../model/auth')
const argon2 = require('argon2')
const {GenerateToken} = require('../helper/token')

const AuthController = {
    register: async (req, res, next) => {
        let {full_name, email, password} = req.body
        
        //Check column is filled or not
        if(!full_name || full_name == "" || !email || !password || email == "" || password == ""){
            return res.status(401).json({status:401, messages: "Please fill in all required fields"})
        }

        let user = await getUsersByEmail(email)

        // Check email
        if(user.rowCount === 1){
            return res.status(401).json({status:401, messages: "Email is already registered, please login"})
        }

        // Process
        password = await argon2.hash(password)
        let data = { id: uuidv4(), full_name, email, password}
        let result = await inputUsers(data)
        console.log("Result")
        console.log(result)
        res.status(201).json({status:200, messages: "Register success, please login"})
    },

    login: async (req, res, next) => {
        let {email, password} = req.body
        
        //Check column is filled or not
        if(!email || !password || email == "" || password == ""){
            return res.status(401).json({status:401, messages: "Please fill in all required fields"})
        }

        let user = await getUsersByEmail(email)

        // Check email
        if(user.rowCount === 0){
            return res.status(401).json({status:401, messages: "Email not register"})
        }

        let userData = user.rows[0]
        // console.log(userData)
        let isVerify = await argon2.verify(userData.password, password)
        
        // Check password
        if(!isVerify){
            return res.status(401).json({status:401, messages: "Incorrect password"})
        }
        
        console.log(userData)
        
        delete userData.password
        let token = GenerateToken(userData)

        res.status(201).json({status:200, messages: "Login success", token})
    }
}

module.exports = AuthController
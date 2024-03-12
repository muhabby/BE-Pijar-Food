const { v4: uuidv4 } = require('uuid')
const {
    showUsersModel,
    showUsersByIdModel,
    searchUsersDetailModel,
    searchUsersCountModel,
    inputUsersModel,
    updateUsersModel,
    deleteUsersModel
} = require('../model/users')
const argon2 = require('argon2')

const usersController = {
    showUsers: async (req, res, next) => {
        try {
            // Process
            let users = await showUsersModel()
            let result = users.rows
            return res.status(200).json({ message: 'Success showUsers', data: result })
        }
        catch (err) {
            console.log('showUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed showUsers' })
        }
    },

    showUsersById: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Process
            let users = await showUsersByIdModel(id)
            let result = users.rows
            if (!result.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }
            return res.status(200).json({ message: 'Success showUsersById', data: result[0] })
        }
        catch (err) {
            console.log('showUsersById error')
            console.log(err)
            return res.status(404).json({ message: 'Failed showUsersByIdcipe' })
        }
    },

    searchUsers: async (req, res, next) => {
        try {
            // Check searchBy
            let searchBy
            if (req.query.searchBy === "") {
                if (req.query.searchBy !== "full_name") {
                    searchBy = req.query.searchBy
                }
                else {
                    searchBy = "full_name"
                }
            }
            else {
                searchBy = "full_name"
            }

            // Check sortBy
            let sortBy
            if (req.query.sortBy === "") {
                if (req.query.sortBy !== "creates_at") {
                    sortBy = req.query.sortBy
                }
                else {
                    sortBy = "created_at"
                }
            }
            else {
                sortBy = "created_at"
            }

            // Check sort
            let sort
            if (req.query.sort === "") {
                if (req.query.sort !== "ASC" || req.query.sort !== "DESC") {
                    sort = req.query.sort
                }
                else {
                    sort = "ASC"
                }
            }
            else {
                sort = "ASC"
            }

            // Check search, limit & page
            let search = req.query.search || ""
            let limit = parseInt(req.query.limit) || 3
            let page = ((parseInt(req.query.page) || 1) - 1) * parseInt(limit)

            // Process
            let data = { searchBy, search, sortBy, sort, limit, page }
            let users = await searchUsersDetailModel(data)
            let count = await searchUsersCountModel(data)
            let total = count.rowCount
            let result = users.rows

            // Pagination
            let pageNext
            if (parseInt(req.query.page) >= Math.round(total / parseInt(limit))) {
                pageNext = 0
            }
            else {
                pageNext = parseInt(req.query.page) + 1
            }
            let pagination = {
                pageTotal: Math.round(total / parseInt(limit)),
                pagePrev: parseInt(req.query.page) - 1,
                pageNow: parseInt(req.query.page),
                pageNext,
                totalData: total
            }

            return res.status(200).json({ message: 'Success searchUsersDetail', data: result, pagination })
        }
        catch (err) {
            console.log('searchUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed searchUsersDetail' })
        }
    },

    inputUsers: async (req, res, next) => {
        try {
            // Check token
            if(!req.payload){
                return res.status(404).json({code: 404, message: "Server need token, please login"})
            }
            
            let { full_name, email, password, profile_picture, bio } = req.body

            // Check body
            if (!full_name || full_name === "" || !email || email === "" || !password || password === "" || !profile_picture || profile_picture === "" || !bio || bio === "") {
                return res.json({ code: 404, message: "Input invalid" });
            }

            // Process
            let data = { id: uuidv4(), full_name, email, password, profile_picture, bio }
            let result = await inputUsersModel(data)
            if (result.rowCount === 1) {
                return res.status(201).json({ code: 201, message: "Success input data" })
            }
            return res.status(401).json({ code: 401, message: "Failed input data" })
        }
        catch (err) {
            console.log('inputUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed inputUsers' })
        }
    },

    updateUsers: async (req, res, next) => {
        try {
            let { id } = req.params
            // Check token
            if(!req.payload){
                return res.status(404).json({code: 404, message: "Server need token, please login"})
            }

            // Check params and body
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            let { full_name, email, password, profile_picture, bio } = req.body

            // Check Users
            let users = await showUsersByIdModel(id)
            let resultUsers = users.rows
            if (!resultUsers.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }

            let newUsers = resultUsers[0]
            
            // Check if id users and id token same or not
            if (req.payload.id !== newUsers.id) {
                console.log(`id_token = ${req.payload.id}`)
                console.log(`id_user = ${newUsers.id}`)
                return res.status(404).json({code: 404, message: 'This is not your account'})
            }

            // Process
            password = await argon2.hash(password)
            let data = {
                id,
                full_name: full_name || newUsers.full_name,
                email: email || newUsers.email,
                password: password || newUsers.password,
                profile_picture: profile_picture || newUsers.profile_picture,
                bio: bio || newUsers.bio,
            }
            let result = await updateUsersModel(data)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success update data" })
            }
            return res.status(401).json({ code: 401, message: "Failed update data" })
        }
        catch (err) {
            console.log('updateUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed updateUsers' })
        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            let { id } = req.params

            // Check token
            if(!req.payload){
                return res.status(404).json({code: 404, message: "Server need token, please login"})
            }

            // Check params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Check Users
            let users = await showUsersByIdModel(id)
            let resultUsers = users.rows
            if (!resultUsers.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }

            let newUsers = resultUsers[0]
            
            // Check if id users and id token same or not
            if (req.payload.id !== newUsers.id) {
                console.log(`id_token = ${req.payload.id}`)
                console.log(`id_user = ${newUsers.id}`)
                return res.status(404).json({code: 404, message: 'This is not your account'})
            }

            // Process
            let result = await deleteUsersModel(id)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success delete data" });
            }
            return res.status(404).json({ code: 404, message: "Failed delete data" });
        }
        catch (err) {
            console.log('dropUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed dropUsers' })
        }
    }
}

module.exports = usersController
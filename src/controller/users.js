const { v4: uuidv4 } = require('uuid')
const {
    getUsersModel,
    getUsersByIdModel,
    searchUsersDetailModel,
    searchUsersCountModel,
    inputUsersModel,
    updateUsersModel,
    deleteUsersModel
} = require('../model/users')
const { search } = require('../router')

const usersController = {
    getUsers: async (req, res, next) => {
        try {
            // Process
            let users = await getUsersModel()
            let result = users.rows
            return res.status(200).json({ message: 'Success getUsers', data: result })
        }
        catch (err) {
            console.log('getUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getUsers' })
        }
    },

    getUsersById: async (req, res, next) => {
        try {
            // Check params
            let { user_id } = req.params
            if (user_id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Process
            let users = await getUsersByIdModel(user_id)
            let result = users.rows
            if (!result.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }
            return res.status(200).json({ message: 'Success getUsersById', data: result[0] })
        }
        catch (err) {
            console.log('getUsersById error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getUsersByIdcipe' })
        }
    },

    searchUsers: async (req, res, next) => {
        try {
            // Check searchBy
            let searchBy
            if (req.query.searchBy === "") {
                if (req.query.searchBy !== "full_name" || req.query.searchBy !== "email") {
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
                if (req.query.sortBy !== "regist_date") {
                    sortBy = req.query.sortBy
                }
                else {
                    sortBy = "regist_date"
                }
            }
            else {
                sortBy = "regist_date"
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

            return res.status(200).json({ message: 'Success getUsersDetail', data: result, pagination })
        }
        catch (err) {
            console.log('getUsers error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getUsersDetail' })
        }
    },

    inputUsers: async (req, res, next) => {
        try {
            // Check body
            let { full_name, email, password, profile_picture, about_me } = req.body
            if (!full_name || full_name === "" || !email || email === "" || !password || password === "" || !profile_picture || profile_picture === "" || !about_me || about_me === "") {
                return res.json({ code: 404, message: "Input invalid" });
            }

            // Process
            let data = { user_id: uuidv4(), full_name, email, password, profile_picture, about_me }
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
            // Check params and body
            let { user_id } = req.params
            if (user_id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }
            let { full_name, email, password, profile_picture, about_me } = req.body

            // Check Users
            let users = await getUsersByIdModel(user_id)
            let resultUsers = users.rows
            if (!resultUsers.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }

            // Process
            let newUsers = resultUsers[0]
            let data = {
                user_id,
                full_name: full_name || newUsers.full_name,
                email: email || newUsers.email,
                password: password || newUsers.password,
                profile_picture: profile_picture || newUsers.profile_picture,
                about_me: about_me || newUsers.about_me,
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
            // Check params
            let { user_id } = req.params
            if (user_id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Check Users
            let users = await getUsersByIdModel(user_id)
            let resultUsers = users.rows
            if (!resultUsers.length) {
                return res.status(404).json({ message: 'Users not found or id invalid' })
            }

            // Process
            let result = await deleteUsersModel(user_id)
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
/* eslint-disable no-unused-vars */
// const { v4: uuidv4 } = require('uuid')
const {
    getCategoryModel,
    getCategoryByIdModel,
    searchCategoryDetailModel,
    searchCategoryCountModel,
    inputCategoryModel,
    updateCategoryModel,
    deleteCategoryModel
} = require('../model/category')

const categoryController = {
    getCategory: async (req, res, next) => {
        try {
            // Process
            let category = await getCategoryModel()
            let result = category.rows
            return res.status(200).json({ message: 'Success getCategory', data: result })
        }
        catch (err) {
            console.log('getCategory error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getCategory' })
        }
    },

    getCategoryById: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Process
            let category = await getCategoryByIdModel(id)
            let result = category.rows
            if (!result.length) {
                return res.status(404).json({ message: 'Category not found or id invalid' })
            }
            return res.status(200).json({ message: 'Success getCategoryById', data: result[0] })
        }
        catch (err) {
            console.log('getCategoryById error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getCategoryByIdcipe' })
        }
    },

    searchCategory: async (req, res, next) => {
        try {
            // Check searchBy
            let searchBy
            if (req.query.searchBy === "") {
                if (req.query.searchBy !== "name") {
                    searchBy = req.query.searchBy
                }
                else {
                    searchBy = "name"
                }
            }
            else {
                searchBy = "name"
            }

            // Check sortBy
            let sortBy
            if (req.query.sortBy === "") {
                if (req.query.sortBy !== "created_at" || req.query.sortBy !== "updated_at") {
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
            let category = await searchCategoryDetailModel(data)
            let count = await searchCategoryCountModel(data)
            let total = count.rowCount
            let result = category.rows

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

            return res.status(200).json({ message: 'Success getCategoryDetail', data: result, pagination })
        }
        catch (err) {
            console.log('getCategory error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getCategoryDetail' })
        }
    },

    inputCategory: async (req, res, next) => {
        try {
            // Check body
            let { name, description, picture } = req.body
            if (!name || name === "" || !description || description === "" || !picture || picture === "") {
                return res.json({ code: 404, message: "Input invalid" });
            }

            // Process
            let data = { name, description, picture }
            let result = await inputCategoryModel(data)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success input data" })
            }
            return res.status(404).json({ code: 404, message: "Failed input data" })
        }
        catch (err) {
            console.log('inputCategory error')
            console.log(err)
            return res.status(404).json({ message: 'Failed inputCategory' })
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            // Check params and body
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }
            let { name, description, picture } = req.body

            // Check Category
            let category = await getCategoryByIdModel(id)
            let resultCategory = category.rows
            if (!resultCategory.length) {
                return res.status(404).json({ message: 'Category not found or id invalid' })
            }

            // Process
            let newCategory = resultCategory[0]
            let data = {
                id,
                name: name || newCategory.name,
                description: description || newCategory.description,
                picture: picture || newCategory.picture
            }
            let result = await updateCategoryModel(data)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success update data" })
            }
            return res.status(404).json({ code: 404, message: "Failed update data" })
        }
        catch (err) {
            console.log('putCategory error')
            console.log(err)
            return res.status(404).json({ message: 'Failed putCategory' })
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }

            // Check Category
            let category = await getCategoryByIdModel(id)
            let resultCategory = category.rows
            if (!resultCategory.length) {
                return res.status(404).json({ message: 'Category not found or id invalid' })
            }

            // Process
            let result = await deleteCategoryModel(id)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success delete data" });
            }
            return res.status(404).json({ code: 404, message: "Failed delete data" });
        }
        catch (err) {
            console.log('dropCategory error')
            console.log(err)
            return res.status(404).json({ message: 'Failed dropCategory' })
        }
    }
}

module.exports = categoryController
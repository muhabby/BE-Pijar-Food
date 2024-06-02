/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid')
const {
    showRecipeModel,
    showRecipeByIdModel,
    getRecipeByIdModel,
    searchRecipeDetailModel,
    searchRecipeCountModel,
    inputRecipeModel,
    updateRecipeModel,
    deleteRecipeModel,
    getCategoryByIdModel,
    showRecipeByUserIdModel
} = require('../model/recipe')
const cloudinary = require('../config/photo')

const RecipeController = {
    showRecipe: async (req, res, next) => {
        try {
            // Process
            let recipe = await showRecipeModel()
            let result = recipe.rows
            return res.status(200).json({ code: 200, message: 'Success showRecipe', data: result })
        }
        catch (err) {
            console.log('showRecipe error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed showRecipe' })
        }
    },

    showRecipeById: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ code: 404, message: 'Params id invalid' })
            }

            // Process
            let recipe = await showRecipeByIdModel(id)
            let result = recipe.rows
            if (!result.length) {
                return res.status(404).json({ code: 404, message: 'Recipe not found or id invalid' })
            }
            return res.status(200).json({ code: 200, message: 'Success showRecipeById', data: result[0] })
        }
        catch (err) {
            console.log('showRecipeById error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed showRecipeByIdcipe' })
        }
    },

    showRecipeByUserId: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ code: 404, message: 'Params id invalid' })
            }

            // Process
            let recipe = await showRecipeByUserIdModel(id)
            let result = recipe.rows
            if (!result.length) {
                return res.status(404).json({ code: 404, message: 'User not found or id invalid' })
            }
            return res.status(200).json({ code: 200, message: 'Success showRecipeByUserId', data: result })
        }
        catch (err) {
            console.log('showRecipeById error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed showRecipeByUserId' })
        }
    },

    searchRecipe: async (req, res, next) => {
        try {
            // Check searchBy
            let searchBy
            if (req.query.searchBy === "") {
                if (req.query.searchBy !== "title" || req.query.searchBy !== "ingredient") {
                    searchBy = req.query.searchBy
                }
                else {
                    searchBy = "title"
                }
            }
            else {
                searchBy = "title"
            }

            // Check sortBy
            let sortBy
            sortBy = req.query.sortBy
            // if (req.query.sortBy === "") {
            //     if (req.query.sortBy !== "created_at" || req.query.sortBy !== "updated_at") {
            //         sortBy = req.query.sortBy
            //     }
            //     else {
            //         sortBy = "created_at"
            //     }
            // }
            // else {
            //     sortBy = "created_at"
            // }

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
            let recipe = await searchRecipeDetailModel(data)
            let count = await searchRecipeCountModel(data)
            let total = count.rowCount
            let result = recipe.rows

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

            return res.status(200).json({ code: 200, message: 'Success searchRecipeDetail', data: result, pagination })
        }
        catch (err) {
            console.log('searchRecipe error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed searchRecipeDetail' })
        }
    },

    inputRecipe: async (req, res, next) => {
        try {
            let { title, ingredient, photo, category_id } = req.body
            
            // Check token
            if(!req.payload){
                return res.status(404).json({code: 404, message: "Server need token, please login"})
            }

            // Check body
            // if (!title || title === "" || title === " " || !ingredient || ingredient === "" || ingredient === " " || !category_id || category_id === "" || category_id === " ") {
            if (!title.trim() || !ingredient.trim() || !category_id.trim()) {
                return res.status(404).json({code: 404, message: "Input invalid" });
            }
            
            // Check category id
            let category = await getCategoryByIdModel(category_id)
            let resultCategory = category.rows
            if (!resultCategory.length) {
                return res.status(404).json({code: 404, message: 'Category not found' })
            }

            // Check photo
            console.log('photo')
            console.log(req.file)

            // Check format photo
            console.log('isFileValid : '+ req.isFileValid)
            if (req.isFileValid === false) {
                return res.status(404).json({code: 404, message: req.isFileValidMessage})
            }
            if (req.isFileValid === undefined) {
                return res.status(404).json({code: 404, message: "Photo required"})
            }
            
            // Check photo size
            console.log('photo_size : ' + req.file.size)
            if (req.file.size >= 5242880) {
                return res.status(404).json({code: 404, message: "Photo is too large (max. 5 mb)"})
            }

            // Upload photo using cloudinary
            const imageUpload = await cloudinary.uploader.upload(req.file.path,{
                folder: 'recipe-assets'
            })

            // Check if photo not uploaded to cloudinary
            console.log('cloudinary')
            console.log(imageUpload)
            if (!imageUpload) {
                return res.status(404).json({code: 404, message: "Upload photo failed"})
            }

            // Process
            let data = { id: uuidv4(), title, ingredient, photo:imageUpload.secure_url, category_id, user_id: req.payload.id }
            let result = await inputRecipeModel(data)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success input data" })
            }
            return res.status(404).json({ code: 404, message: "Failed input data" })
        }
        catch (err) {
            console.log('inputRecipe error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed inputRecipe' })
        }
    },
    

    updateRecipe: async (req, res, next) => {
        try {
            let { title, ingredient, photo, category_id } = req.body
            
            // Check token
            if(!req.payload){
                return res.status(404).json({code: 404, message: "Server need token, please login"})
            }

            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({code: 404, message: 'Params id invalid' })
            }
            
            // Check recipe
            let recipe = await getRecipeByIdModel(id)
            let resultRecipe = recipe.rows
            if (!resultRecipe.length) {
                return res.status(404).json({code: 404, message: 'Recipe not found or id invalid' })
            }

            // Check if user_id and id token same or not
            let newRecipe = resultRecipe[0]
            if (req.payload.id !== newRecipe.user_id) {
                console.log(`id_token = ${req.payload.id}`)
                console.log(`id_user = ${newRecipe.user_id}`)
                return res.status(404).json({code: 404, message: 'This is not your recipe'})
            }

            // Process
            let data = {
                id,
                title: title || newRecipe.title,
                ingredient: ingredient || newRecipe.ingredient,
                category_id: category_id || newRecipe.category_id
            }

            // Check & update with photo
            console.log('photo')
            console.log(req.file)

            // Update with photo
            if (req.isFileValid === true) {

                // Check photo size
                console.log('photo_size : ' + req.file.size)
                if (req.file.size >= 5242880) {
                    return res.status(404).json({code: 404, message: "Photo is too large (max. 5 mb)"})
                }

                // Upload photo
                const imageUpload = await cloudinary.uploader.upload(req.file.path,{
                    folder: 'recipe-assets'
                })
                
                // Check if photo not uploaded to cloudinary
                console.log('cloudinary')
                console.log(imageUpload)
                if (!imageUpload) {
                    return res.status(404).json({code: 404, message: "Upload photo failed"})
                }

                // Process
                data.photo = imageUpload.secure_url
                let result = await updateRecipeModel(data);
                if (result.rowCount === 1) {
                    return res.status(200).json({code: 200, message: "Success update data" })
                }
            }
            else if (req.isFileValid === false) {
                // Check format photo
                console.log('isFileValid : '+ req.isFileValid)
                if (!req.isFileValid) {
                    return res.status(404).json({code: 404, message: req.isFileValidMessage})
                }
            }
            // Update without photo
            else if (req.isFileValid === undefined) {
                // Process
                data.photo = newRecipe.photo
                let result = await updateRecipeModel(data);
                if (result.rowCount === 1) {
                    return res.status(200).json({ code: 200, message: "Success update data" })
                }
            }
            
            return res.status(404).json({code: 404, message: "Failed update data" })
        }
        catch (err) {
            console.log('putRecipe error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed putRecipe' })
        }
    },

    deleteRecipe: async (req, res, next) => {
        try {
            // Check params
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({code: 404, message: 'Params id invalid' })
            }

            let recipe = await getRecipeByIdModel(id)

            // Check recipe
            let resultRecipe = recipe.rows
            if (!resultRecipe.length) {
                return res.status(404).json({code: 404, message: 'Recipe not found or id invalid' })
            }

            // Check if user_id and id token same or not
            let newRecipe = resultRecipe[0]
            if (req.payload.id !== newRecipe.user_id) {
                console.log(`id_token = ${req.payload.id}`)
                console.log(`id_user = ${newRecipe.user_id}`)
                return res.status(404).json({code: 404, message: 'This is not your recipe'})
            }

            // Process
            let result = await deleteRecipeModel(id)
            if (result.rowCount === 1) {
                return res.status(200).json({ code: 200, message: "Success delete data" });
            }
            return res.status(404).json({ code: 404, message: "Failed delete data" });
        }
        catch (err) {
            console.log('dropRecipe error')
            console.log(err)
            return res.status(404).json({ code: 404, message: 'Failed dropRecipe' })
        }
    }
}

module.exports = RecipeController
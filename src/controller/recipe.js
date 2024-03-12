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
    getCategoryByIdModel
} = require('../model/recipe')

const RecipeController = {
    showRecipe: async (req, res, next) => {
        try {
            // Process
            let recipe = await showRecipeModel()
            let result = recipe.rows
            return res.status(200).json({ message: 'Success showRecipe', data: result })
        }
        catch (err) {
            console.log('showRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed showRecipe' })
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
            return res.status(200).json({ message: 'Success showRecipeById', data: result[0] })
        }
        catch (err) {
            console.log('showRecipeById error')
            console.log(err)
            return res.status(404).json({ message: 'Failed showRecipeByIdcipe' })
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

            return res.status(200).json({ message: 'Success searchRecipeDetail', data: result, pagination })
        }
        catch (err) {
            console.log('searchRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed searchRecipeDetail' })
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
            if (!title || title === "" || !ingredient || ingredient === "" || !category_id || category_id === "") {
                return res.status(404).json({code: 404, message: "Input invalid" });
            }
            
            // Check category id
            let category = await getCategoryByIdModel(category_id)
            let resultCategory = category.rows
            if (!resultCategory.length) {
                return res.status(404).json({code: 404, message: 'Category not found' })
            }

            // Process
            let data = { id: uuidv4(), title, ingredient, photo, category_id, user_id: req.payload.id }
            let result = await inputRecipeModel(data)
            if (result.rowCount === 1) {
                return res.status(201).json({ code: 201, message: "Success input data" })
            }
            return res.status(401).json({ code: 401, message: "Failed input data" })
        }
        catch (err) {
            console.log('inputRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed inputRecipe' })
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
            let data = {
                id,
                title: title || newRecipe.title,
                ingredient: ingredient || newRecipe.ingredient,
                photo: photo || newRecipe.photo,
                category_id: category_id || newRecipe.category_id
            }
            let result = await updateRecipeModel(data)
            if (result.rowCount === 1) {
                return res.status(200).json({code: 200, message: "Success update data" })
            }
            return res.status(401).json({code: 404, message: "Failed update data" })
        }
        catch (err) {
            console.log('putRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed putRecipe' })
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
            return res.status(404).json({ message: 'Failed dropRecipe' })
        }
    }
}

module.exports = RecipeController
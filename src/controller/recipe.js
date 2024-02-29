const { v4: uuidv4 } = require('uuid')
const { getRecipeModel, getRecipeByIdModel, createRecipe, updateRecipe } = require('../model/recipe')

const RecipeController = {
    getRecipe: async (req, res, next) => {
        try {
            let recipe = await getRecipeModel()
            let result = recipe.rows
            return res.status(200).json({ message: 'Success getRecipe', data: result })
        } catch (err) {
            console.log('getRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getRecipe' })
        }
    },

    getRecipeById: async (req, res, next) => {
        try {
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }
            let recipe = await getRecipeByIdModel(id)
            let result = recipe.rows
            if (!result.length) {
                return res.status(404).json({ message: 'Recipe not found or id invalid' })
            }
            return res.status(200).json({ message: 'Success getRecipeById', data: result[0] })
        } catch (err) {
            console.log('getRecipeById error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getRecipeByIdcipe' })
        }
    },

    inputRecipe: async (req, res, next) => {
        try {
            let { title, ingredient, photo } = req.body
            if (!title || title === "" || !ingredient || ingredient === "" || !photo || photo === "") {
                return res.json({ code: 404, message: "Input invalid" });
            }
            let data = { id: uuidv4(), title, ingredient, photo }
            let result = await createRecipe(data)
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

    putRecipe: async (req, res, next) => {
        try {
            // Check params and body
            let { id } = req.params
            if (id === '') {
                return res.status(404).json({ message: 'Params id invalid' })
            }
            let { title, ingredient, photo } = req.body

            // Check recipe
            let recipe = await getRecipeByIdModel(id)
            let resultRecipe = recipe.rows
            if (!resultRecipe.length) {
                return res.status(404).json({ message: 'Recipe not found or id invalid' })
            }
            let newRecipe = resultRecipe[0]
            let data = {
                id,
                title: title || newRecipe.title,
                ingredient: ingredient || newRecipe.ingredient,
                photo: photo || newRecipe.photo
            }

            let result = await updateRecipe(data)
            if (result.rowCount === 1) {
                return res.status(201).json({ code: 201, message: "Success update data" })
            }
            return res.status(401).json({ code: 401, message: "Failed update data" })
        }
        catch (err) {
            console.log('putRecipe error')
            console.log(err)
            return res.status(404).json({ message: 'Failed putRecipe' })
        }
    }
}

module.exports = RecipeController
const { getRecipeModel, getRecipeByIdModel } = require('../model/recipe')

const RecipeController = {
    getRecipe: async (req, res, next) => {
        try {
            let recipe = await getRecipeModel()
            let result = recipe.rows
            return res.status(200).json({ message: 'Success getRecipe', data: result })
        } catch (err) {
            console.log('recipe controller error')
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
                return res.status(404).json({ message: 'User not found or id invalid' })
            }
            return res.status(200).json({ message: 'Success getRecipeById', data: result[0] })
        } catch (err) {
            console.log('recipe controller error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getRecipeByIdcipe' })
        }
    }
}

module.exports = RecipeController
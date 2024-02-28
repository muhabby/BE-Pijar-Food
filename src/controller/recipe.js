const { getRecipeModel } = require('../model/recipe')

const RecipeController = {
    getRecipe: async (req, res, next) => {
        try {
            let recipe = await getRecipeModel()
            console.log('recipe controller')
            let result = recipe.rows
            return res.status(200).json({ message: 'Success getRecipe Controller', data: result })
        } catch (err) {
            console.log('recipe controller error')
            console.log(err)
            return res.status(404).json({ message: 'Failed getRecipe Controller' })
        }
    }
}

module.exports = RecipeController
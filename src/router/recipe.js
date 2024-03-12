const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()
const {Protect} = require('../middleware/private')

router.get('/', RecipeController.showRecipe)
router.get('/detail', RecipeController.searchRecipe)
router.get('/:id', RecipeController.showRecipeById)
router.post('/', Protect, RecipeController.inputRecipe)
router.put('/:id', Protect, RecipeController.updateRecipe)
router.delete('/:id', Protect, RecipeController.deleteRecipe)

module.exports = router
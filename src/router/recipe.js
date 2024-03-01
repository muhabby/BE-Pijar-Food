const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()

router.get('/', RecipeController.getRecipe)
router.get('/detail', RecipeController.searchRecipe)
router.get('/:id', RecipeController.getRecipeById)
router.post('/', RecipeController.inputRecipe)
router.put('/:id', RecipeController.updateRecipe)
router.delete('/:id', RecipeController.deleteRecipe)

module.exports = router
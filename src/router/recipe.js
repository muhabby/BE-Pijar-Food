const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()

router.get('/', RecipeController.getRecipe)
router.get('/:id', RecipeController.getRecipeById)
router.post('/', RecipeController.inputRecipe)
router.put('/:id', RecipeController.putRecipe)
router.delete('/:id', RecipeController.dropRecipe)

module.exports = router
const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()

router.get('/', RecipeController.getRecipe)
router.get('/:id', RecipeController.getRecipeById)

module.exports = router
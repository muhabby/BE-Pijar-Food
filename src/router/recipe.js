const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()

router.get('/', RecipeController.getRecipe)

module.exports = router
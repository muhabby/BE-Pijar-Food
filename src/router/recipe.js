const express = require('express')
const RecipeController = require('../controller/recipe')
const router = express.Router()
const {Protect} = require('../middleware/private')
const upload = require('../middleware/photo')

router.get('/', RecipeController.showRecipe)
router.get('/detail', RecipeController.searchRecipe)
router.get('/:id', RecipeController.showRecipeById)
router.get('/user/:id', RecipeController.showRecipeByUserId)
router.post('/', Protect, upload.single('photo'), RecipeController.inputRecipe)
router.put('/:id', Protect, upload.single('photo'), RecipeController.updateRecipe)
router.delete('/:id', Protect, RecipeController.deleteRecipe)

module.exports = router
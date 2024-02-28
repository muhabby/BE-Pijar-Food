const express = require('express')
const router = express.Router()
const recipe = require('./recipe')

router.use('/recipe', recipe)

module.exports = router
const express = require('express')
const router = express.Router()
const recipe = require('./recipe')
const users = require('./users')

router.use('/recipe', recipe)
router.use('/users', users)

module.exports = router
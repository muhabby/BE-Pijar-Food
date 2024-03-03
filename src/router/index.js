const express = require('express')
const router = express.Router()
const recipe = require('./recipe')
const users = require('./users')
const category = require('./category')

router.use('/recipe', recipe)
router.use('/users', users)
router.use('/category', category)

module.exports = router
const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()

router.get('/', UsersController.getUsers)
router.get('/detail', UsersController.searchUsers)
router.get('/:id', UsersController.getUsersById)
router.post('/', UsersController.inputUsers)
router.put('/:id', UsersController.updateUsers)
router.delete('/:id', UsersController.deleteUsers)

module.exports = router
const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()

router.get('/', UsersController.getUsers)
router.get('/', UsersController.searchUsers)
router.get('/:user_id', UsersController.getUsersById)
router.post('/', UsersController.inputUsers)
router.put('/:user_id', UsersController.updateUsers)
router.delete('/:user_id', UsersController.deleteUsers)

module.exports = router
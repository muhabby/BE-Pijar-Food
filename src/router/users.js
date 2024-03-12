const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
const {Protect} = require('../middleware/private')

router.get('/', UsersController.getUsers)
router.get('/detail', UsersController.searchUsers)
router.get('/:id', UsersController.getUsersById)
router.post('/', Protect, UsersController.inputUsers)
router.put('/:id', Protect, UsersController.updateUsers)
router.delete('/:id', Protect, UsersController.deleteUsers)

module.exports = router
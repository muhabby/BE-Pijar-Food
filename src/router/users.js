const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
const {Protect} = require('../middleware/private')

router.get('/', UsersController.showUsers)
router.get('/detail', UsersController.searchUsers)
router.get('/:id', UsersController.showUsersById)
router.post('/', Protect, UsersController.inputUsers)
router.put('/:id', Protect, UsersController.updateUsers)
router.delete('/:id', Protect, UsersController.deleteUsers)

module.exports = router
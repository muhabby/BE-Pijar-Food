const express = require("express");
const UsersController = require("../controller/users");
const router = express.Router();
const { Protect } = require("../middleware/private");
const upload = require("../middleware/photo");

router.get("/", UsersController.showUsers);
router.get("/detail", UsersController.searchUsers);
router.get("/:id", UsersController.showUsersById);
router.put("/", Protect, upload.single("profile_picture"), UsersController.updateUsers);
router.delete("/:id", Protect, UsersController.deleteUsers);

module.exports = router;

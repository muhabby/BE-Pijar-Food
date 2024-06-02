const express = require("express");
const router = express.Router();
const recipe = require("./recipe");
const users = require("./users");
const category = require("./category");
const auth = require("./auth");

router.use("/recipe", recipe);
router.use("/users", users);
router.use("/category", category);
router.use("/auth", auth);

module.exports = router;

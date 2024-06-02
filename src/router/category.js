const express = require("express");
const CategoryController = require("../controller/category");
const router = express.Router();

router.get("/", CategoryController.getCategory);
router.get("/detail", CategoryController.searchCategory);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.inputCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;

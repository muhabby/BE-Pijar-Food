const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();
const { Protect } = require("../middleware/private");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/activated/:id/:otp", AuthController.verification);
router.put("/otpRequest", AuthController.otpRequest);
router.post("/otpInput", AuthController.otpInput);
router.put("/resetPassword", Protect, AuthController.resetPassword);

module.exports = router;

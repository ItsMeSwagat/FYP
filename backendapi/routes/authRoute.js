const express = require("express")
const router = express.Router();
const authController = require("../controller/authController");
const { authenticateUser } = require("../middleware/authenticate");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/password/forgot", authController.forgotPassword)
router.put("/password/reset/:resettoken", authController.resetPassword)


module.exports = router
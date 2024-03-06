const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authenticateUser } = require("../middleware/authenticate");

router.get("/me", authenticateUser, userController.getUserDetails);
router.put("/me/update", authenticateUser, userController.updateProfile);
router.put("/password/change", authenticateUser, userController.changeUserPassword);

module.exports = router;

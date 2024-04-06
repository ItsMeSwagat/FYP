const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const cartController = require("../controller/cartController");
const { authenticateUser } = require("../middleware/authenticate");

router.get("/customer", authenticateUser, userController.getUserDetails);
router.put("/customer/update", authenticateUser, userController.updateProfile);
router.put("/password/change", authenticateUser, userController.changeUserPassword);


module.exports = router;

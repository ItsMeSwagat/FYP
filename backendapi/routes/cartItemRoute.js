const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItemController");
const { authenticateUser } = require("../middleware/authenticate");

router.put("/:id", authenticateUser, cartItemController.updateCartItem);
router.delete("/:id", authenticateUser, cartItemController.removeCartItem);


module.exports = router;
const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authenticate");
const orderController = require("../controller/orderController");

router.get("/details/:id", authenticateUser, orderController.getOrderDetails);
router.post("/new", authenticateUser, orderController.createNewOrder);
router.get("/user", authenticateUser, orderController.userOrders);
router.put("/:id/cancel", authenticateUser, orderController.cancelOrder);

module.exports = router;

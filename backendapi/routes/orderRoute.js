const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authenticate");
const orderController = require("../controller/orderController");
const {
  handleKhaltiCallback,
} = require("../controller/khaltiPaymentController");

router.post("/new", authenticateUser, orderController.createNewOrder);
router.get("/user", authenticateUser, orderController.userOrders);
router.put("/:id/cancel", authenticateUser, orderController.cancelOrder);

module.exports = router;

const express = require("express");
const { authenticateUser } = require("../middleware/authenticate");
const {
  handleKhaltiCallback,
} = require("../controller/khaltiPaymentController");
const { updateOrderAfterPayment } = require("../controller/orderController");
const router = express.Router();

router.get("/call-back", authenticateUser, updateOrderAfterPayment);

module.exports = router;

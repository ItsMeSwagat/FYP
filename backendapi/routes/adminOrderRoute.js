const express = require("express")
const router = express.Router();

const { authenticateUser, adminAuthenticate } = require("../middleware/authenticate");
const adminOrderController = require("../controller/adminOrderController");

router.get("/order/:id", authenticateUser, adminAuthenticate("admin"), adminOrderController.getSingleOrder);
router.get("/orders", authenticateUser, adminAuthenticate("admin"), adminOrderController.getAllOrders);
router.put("/order/:id", authenticateUser, adminAuthenticate("admin"), adminOrderController.updateOrder);
router.delete("/order/:id", authenticateUser, adminAuthenticate("admin"), adminOrderController.deleteOrder);

module.exports = router;
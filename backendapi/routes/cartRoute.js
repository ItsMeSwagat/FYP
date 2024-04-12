const express = require("express")
const router = express.Router();

const cartController = require("../controller/cartController");
const { authenticateUser } = require("../middleware/authenticate");

router.get("/", authenticateUser, cartController.findUserCart);
router.put("/add", authenticateUser, cartController.addItemToCart);
router.post("/applyvoucher", authenticateUser, cartController.applyVoucher);
router.post("/removevoucher", authenticateUser, cartController.removeVoucher);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  adminAuthenticate,
} = require("../middleware/authenticate");
const voucherController = require("../controller/voucherController");

router.post(
  "/create",
  authenticateUser,
  adminAuthenticate("admin"),
  voucherController.createVoucher
);
router.get(
  "/all",
  authenticateUser,
  adminAuthenticate("admin"),
  voucherController.getAllVouchers
);
router.get(
  "/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  voucherController.getVoucherDetails
);
router.put(
  "/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  voucherController.updateVoucher
);
router.delete(
  "/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  voucherController.deleteVoucher
);

module.exports = router;

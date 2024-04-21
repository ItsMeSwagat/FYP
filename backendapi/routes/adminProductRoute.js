const express = require("express");
const adminProductController = require("../controller/adminProductController");
const topBannerController = require("../controller/topBannerController");
const {
  authenticateUser,
  adminAuthenticate,
} = require("../middleware/authenticate");
const router = express.Router();

router.get(
  "/products",
  authenticateUser,
  adminAuthenticate("admin"),
  adminProductController.getAllProductsAdmin
);
router.post(
  "/product/create",
  authenticateUser,
  adminAuthenticate("admin"),
  adminProductController.createProduct
);
router.put(
  "/product/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  adminProductController.updateProduct
);
router.delete(
  "/product/:id",
  authenticateUser,
  adminAuthenticate("admin"),
  adminProductController.deleteProduct
);

module.exports = router;

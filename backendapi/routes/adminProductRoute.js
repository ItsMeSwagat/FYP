const express = require("express");
const adminProductController = require("../controller/adminProductController");
const topBannerController = require("../controller/topBannerController");
const { authenticateUser, adminAuthenticate } = require("../middleware/authenticate");
const router = express.Router();


router.post("/product/new", authenticateUser, adminAuthenticate("admin"), adminProductController.createProduct);
router.put("/product/:id", authenticateUser, adminAuthenticate("admin"), adminProductController.updateProduct);
router.delete("/product/:id", authenticateUser, adminAuthenticate("admin"), adminProductController.deleteProduct);
router.post("/topbanner/new", authenticateUser, adminAuthenticate("admin"), topBannerController.createOrUpdateBanner);

module.exports = router;
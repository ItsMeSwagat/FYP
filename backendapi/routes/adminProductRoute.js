const express = require("express");
const adminProductController = require("../controller/adminProductController");
const { authenticateUser, adminAuthenticate } = require("../middleware/authenticate");
const router = express.Router();


router.post("/product/new", authenticateUser, adminAuthenticate("admin"), adminProductController.createProduct);
router.put("/product/:id", authenticateUser, adminAuthenticate("admin"), adminProductController.updateProduct);
router.delete("/product/:id", authenticateUser, adminAuthenticate("admin"), adminProductController.deleteProduct);

module.exports = router;
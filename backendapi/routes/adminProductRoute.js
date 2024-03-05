const express = require("express");
const adminProductController = require("../controller/adminProductController");
const { route } = require("./productRoute");
const router = express.Router();


router.get("/product/new", adminProductController.createProduct);
router.put("/product/:id", adminProductController.updateProduct);
router.delete("/product/:id", adminProductController.deleteProduct);

module.exports = router
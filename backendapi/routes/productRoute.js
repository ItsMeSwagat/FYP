const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProductDetails);


module.exports = router;
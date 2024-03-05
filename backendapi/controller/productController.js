const Product = require("../models/productModel");

// get all products
exports.getAllProducts = async(req, res) => {
    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        products,
    })
}

//get product details
exports.getProductDetails = async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    res.status(200).json({
        success: true, 
        product
    })
}
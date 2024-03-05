const Product = require("../models/productModel");

//admin create product
exports.createProduct = async(req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}


//admin update product
exports.updateProduct = async( req, res) => {
    let product = Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        product
    })
}


//admin delete product
exports.deleteProduct = async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
}

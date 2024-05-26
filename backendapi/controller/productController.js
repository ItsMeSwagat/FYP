const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// // Get All Product
// const getAllProducts = catchAsyncErrors(async (req, res, next) => {
//   const resultPerPage = 8;
//   const productsCount = await Product.countDocuments();

//   const apiFeature = new Features(Product.find(), req.query).search().filter();

//   const filteredQuery = apiFeature.query.clone();
//   const filteredProductsCount = await filteredQuery.countDocuments();

//   apiFeature.pagination(resultPerPage);
//   const products = await apiFeature.query;

//   res.status(200).json({
//     success: true,
//     products,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   });
// });

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  let resultPerPage = req.query.limit ? parseInt(req.query.limit) : 8; // Default resultPerPage is 8
  const productsCount = await Product.countDocuments();

  const apiFeature = new Features(Product.find(), req.query).search().filter();

  const filteredQuery = apiFeature.query.clone();
  const filteredProductsCount = await filteredQuery.countDocuments();

  apiFeature.pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// get all products
const getAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//get product details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  getAllProducts,
  getProductDetails,
};

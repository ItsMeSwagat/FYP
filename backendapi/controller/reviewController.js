const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");

//CREATE REVIEW
const createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const reviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (reviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //   let avg = 0;
  //   product.ratings =
  //     product.reviews.forEach((rev) => {
  //       avg += rev.rating;
  //     }) / product.reviews.length;

  let totalRating = 0;

  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.ratings = totalRating / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
  });
});

//GET ALL REVIEWS
const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//DELETE REVIEW
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews,
  });

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
};

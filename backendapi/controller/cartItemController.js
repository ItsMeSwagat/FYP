const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CartItem = require("../models/cartItemModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

const updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const cartItemId = req.params.id;
  const cartItemData = req.body;

  if (isNaN(cartItemData.quantity)) {
    return next(new ErrorHandler("Invalid quantity provided", 400));
  }

  const item = await CartItem.findById(cartItemId).populate("product");

  if (!item) {
    return next(new ErrorHandler("CartItem not Found", 401));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  if (user._id.toString() === item.userId.toString()) {
    item.quantity = cartItemData.quantity;

    if (item.product) {
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
    } else {
      return next(
        new ErrorHandler("Product information missing or invalid", 400)
      );
    }

    const updatedCartItem = await item.save();
    return res.status(200).json({updatedCartItem});
  }
});

const removeCartItem = async (req, res, next) => {
  const userId = req.user._id;
  const cartItemId = req.params.id;

  const cartItem = await CartItem.findById(cartItemId);
  const user = await User.findById(userId);

  if (!cartItem) {
    return next(new ErrorHandler("CartItem not Found", 401));
  }

  if (user._id.toString() === cartItem.userId.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
    return res.status(200).json({ success: true });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};

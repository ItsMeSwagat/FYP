const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CartItem = require("../models/cartItemModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const Voucher = require("../models/voucherModel");
const Cart = require("../models/cartModel");

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
    const prevQuantity = item.quantity;
    const newQuantity = cartItemData.quantity;

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

    // Update cart details
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const priceDiff = (newQuantity - prevQuantity) * item.product.price;
    const discountedPriceDiff =
      (newQuantity - prevQuantity) * item.product.discountedPrice;

    cart.totalPrice += priceDiff;
    cart.totalDiscountedPrice += discountedPriceDiff;
    cart.discount = cart.totalPrice - cart.totalDiscountedPrice;

    if (cart.voucher) {
      let voucherDiscount = 0;
      const voucher = await Voucher.findOne({ name: cart.voucher });
      if (voucher) {
        if (voucher.discountType === "percentage") {
          voucherDiscount = (voucher.discount / 100) * cart.totalPrice;
        } else if (voucher.discountType === "fixed") {
          voucherDiscount = voucher.discount;
        }
      }
      cart.voucherDiscount = voucherDiscount;
    }

    await cart.save();
    return res.status(200).json({ updatedCartItem });
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

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const CartItem = require("../models/cartItemModel");
const Voucher = require("../models/voucherModel");

const findUserCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  let cart = await Cart.findOne({ user: id });

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

  cart.cartItems = cartItems;

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (let cartItem of cart.cartItems) {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  }

  cart.discount = totalPrice - totalDiscountedPrice;

  if (cart.voucher) {
    const voucher = await Voucher.findOne({ name: cart.voucher });
    if (voucher) {
      let voucherDiscount = 0;
      if (voucher.discountType === "percentage") {
        voucherDiscount = (voucher.discount / 100) * totalPrice;
      } else if (voucher.discountType === "fixed") {
        voucherDiscount = voucher.discount;
      }
      cart.voucherDiscount = voucherDiscount;
      totalDiscountedPrice -= voucherDiscount;
    }
  }

  cart.totalPrice = totalPrice;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.totalItem = totalItem;

  return res.status(200).json({ cart });
});

const addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  const cart = await Cart.findOne({ user: id });

  if (!cart) {
    return next(new ErrorHandler("Cart not Found", 400));
  }
  const product = await Product.findById(req.body.productId);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 400));
  }

  const isPresent = await CartItem.findOne({
    cart: cart._id,
    product: product._id,
    userId: id,
  });

  if (!isPresent) {
    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity: 1,
      userId: id,
      price: product.price,
      size: req.body.size,
      discountedPrice: product.discountedPrice,
    });

    const newCartItem = await cartItem.save();
    cart.cartItems.push(newCartItem);

    await cart.save();

    return res.status(200).json({ success: true });
  }
});

const createCart = catchAsyncErrors(async (user) => {
  const cart = new Cart({ user });
  const createdCart = await cart.save();
  return createdCart;
});

const applyVoucher = catchAsyncErrors(async (req, res, next) => {
  const { voucherCode } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  if (cart.voucher) {
    return next(new ErrorHandler("Voucher already applied to the cart", 404));
  }

  const voucher = await Voucher.findOne({ name: voucherCode.toUpperCase() });

  if (!voucher) {
    return next(new ErrorHandler("Invalid voucher code", 404));
  }

  let discount = 0;

  if (voucher.expiry < new Date()) {
    return next(new ErrorHandler("Voucher has expired", 400));
  }

  let totalPrice = cart.totalPrice;

  if (voucher.discountType === "percentage") {
    discount = (voucher.discount / 100) * totalPrice;
  } else if (voucher.discountType === "fixed") {
    discount = voucher.discount;
  }

  cart.voucher = voucherCode;
  cart.totalDiscountedPrice = totalPrice - discount;
  cart.voucherDiscount = discount;

  await cart.save();

  res.status(200).json({ cart });
});

const removeVoucher = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  if (!cart.voucher) {
    return next(new ErrorHandler("No voucher applied to the cart", 400));
  }

  cart.voucher = undefined;
  cart.voucherDiscount = 0;

  cart.totalDiscountedPrice = cart.totalPrice - cart.discount;

  await cart.save();

  res.status(200).json({ success: true, cart });
});

module.exports = {
  findUserCart,
  addItemToCart,
  createCart,
  applyVoucher,
  removeVoucher,
};

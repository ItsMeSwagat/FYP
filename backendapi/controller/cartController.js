const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const CartItem = require("../models/cartItemModel");
const Voucher = require("../models/voucherModel");

const findUserCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id; // Retrieve user ID from request

  let cart = await Cart.findOne({ user: id }); // Find user's cart

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));  // If cart not found, return error
  }

  // Find cart items associated with the cart
  let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

   // Update cart with cart items and calculate total prices and discounts
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

  // If cart has a voucher, apply voucher discount
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

   // Update cart with total prices, discounts, and total items
  cart.totalPrice = totalPrice;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.totalItem = totalItem;

  return res.status(200).json({ cart });
});


// ADD ITEM TO CART
const addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id; // Retrieve user ID from request

  const cart = await Cart.findOne({ user: id }); // Find user's cart

   // If cart not found, return error
  if (!cart) {
    return next(new ErrorHandler("Cart not Found", 400));
  }
  const product = await Product.findById(req.body.productId);  // Find product by ID

  // If product not found, return error
  if (!product) {
    return next(new ErrorHandler("Product not Found", 400));
  }

  // Check if product is already in cart
  const isPresent = await CartItem.findOne({
    cart: cart._id,
    product: product._id,
    userId: id,
  });

  // If product is already in cart, return error
  if (isPresent) {
    return next(new ErrorHandler("Product is already in Cart", 404));
  }

  if (!isPresent) {
    const cartItem = new CartItem({ // Create new cart item and add it to cart
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


// CLEAR CART
const clearCart = catchAsyncErrors(async (req, res, next) => {
  // Retrieve user ID from request
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId }); // Find user's cart


  // If cart not found, return error
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  // Delete all cart items associated with the cart
  await CartItem.deleteMany({ cart: cart._id });

  cart.cartItems = [];
  cart.totalPrice = 0;
  cart.totalDiscountedPrice = 0;
  cart.totalItem = 0;
  cart.discount = 0;
  cart.voucher = undefined;
  cart.voucherDiscount = 0;

  await cart.save(); // Save updated cart

  res.status(200).json({ success: true, cart });
});


// CREATECART
const createCart = catchAsyncErrors(async (user) => {
  const cart = new Cart({ user });
  const createdCart = await cart.save();
  return createdCart;
});

const applyVoucher = catchAsyncErrors(async (req, res, next) => {
  const { voucherCode } = req.body;  // Retrieve voucher code and user ID from request
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId }); // Find user's cart

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  // If voucher already applied to cart, return error
  if (cart.voucher) {
    return next(new ErrorHandler("Voucher already applied to the cart", 404));
  }

   // Find voucher by name
  const voucher = await Voucher.findOne({ name: voucherCode.toUpperCase() });

  // If voucher not found, return error
  if (!voucher) {
    return next(new ErrorHandler("Invalid voucher code", 404));
  }

  let discount = 0;

   // Check if voucher has expired
  if (voucher.expiry < new Date()) {
    return next(new ErrorHandler("Voucher has expired", 400));
  }

  let totalPrice = cart.totalPrice;

  // Apply voucher discount based on voucher type
  if (voucher.discountType === "percentage") {
    discount = (voucher.discount / 100) * totalPrice;
  } else if (voucher.discountType === "fixed") {
    discount = voucher.discount;
  }

  // Update cart with voucher details
  cart.voucher = voucherCode;
  cart.totalDiscountedPrice = totalPrice - discount;
  cart.voucherDiscount = discount;

  await cart.save();

  res.status(200).json({ cart });
});

// REMOVE CART
const removeVoucher = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;  // Retrieve user ID from request

  let cart = await Cart.findOne({ user: userId });  // Find user's cart

   // If cart not found, return error
  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

   // If no voucher applied to cart, return error
  if (!cart.voucher) {
    return next(new ErrorHandler("No voucher applied to the cart", 400));
  }

  // Remove voucher from cart and update cart details
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
  clearCart,
};

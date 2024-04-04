const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const CartItem = require("../models/cartItemModel");

// const saveCart = catchAsyncErrors(async (req, res, next) => {
//   const { cartItems } = req.body;
//   const userID = req.user._id;

//   let cart = await Cart.findOne({ user: userID });

//   if (!cart) {
//     cart = new Cart({
//       user: userID,
//       cartItems: cartItems,
//     });
//   } else {
//     cart.cartItems = cartItems;
//   }

//   await cart.save();

//   res.status(200).json({ success: true });
// });

// const getUserCart = catchAsyncErrors(async (req, res, next) => {
//   const userID = req.user._id;

//   const cart = await Cart.findOne({ user: userID }).populate(
//     "cartItems.product",
//     "name price images"
//   );

//   if (!cart) {
//     return res
//       .status(200)
//       .json({ cartItems: [] });
//   }

//   res.status(200).json({ success: true, cartItems: cart.cartItems });
// });

// module.exports = {
//   saveCart,
//   getUserCart,
// };

const findUserCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  let cart = await Cart.findOne({ user: id });

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

  cart.totalPrice = totalPrice;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.totalItem = totalItem;
  cart.discount = totalPrice - totalDiscountedPrice;

  return res.status(200).json({ cart });
});

const addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  const cart = await Cart.findOne({ user: id });
  const product = await Product.findById(req.body.productId);

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

module.exports = {
  findUserCart,
  addItemToCart,
  createCart,
};

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { initiateKhalti } = require("./khaltiPaymentController");

// const createNewOrder = catchAsyncErrors(async (req, res, next) => {
//   const {
//     shippingDetails,
//     orderItems,
//     totalPrice,
//     shippingPrice,
//     totalOrderPrice,
//   } = req.body;

//   const order = await Order.create({
//     orderItems,
//     shippingDetails,
//     paymentInfo: {
//       id: req.payment_id,
//       status: req.status,
//     },
//     totalPrice,
//     shippingPrice,
//     totalOrderPrice,
//     paidAt: new Date(),
//     user: req.user._id,
//   });

//   res.status(201).json({
//     success: true,
//     order,
//   });
// });

const createNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingDetails,
    orderItems,
    totalPrice,
    shippingPrice,
    totalOrderPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingDetails,
    totalPrice,
    shippingPrice,
    totalOrderPrice,
    paidAt: new Date(),
    user: req.user._id,
  });

  const paymentData = {
    return_url: process.env.RETURN_URL,
    website_url: process.env.WEBSITE_URL,
    amount: 10 * 100,
    purchase_order_id: order._id,
    purchase_order_name: "test",
  };

  initiateKhalti(paymentData, req, res);
});

const updateOrderAfterPayment = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.payment_id);

  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }
  order.paymentInfo.id = req.payment_id;
  order.paymentInfo.status = req.status;

  await order.save();
  res.redirect("http://localhost:3000/payment/success");
});

const userOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      model: "Product",
    });

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

const cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findOne({ _id: orderId, user: req.user._id });

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  if (order.orderStatus === "Shipped") {
    return next(new ErrorHandler("Order already Shipped", 400));
  }

  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("Order is already cancelled", 400));
  }

  order.orderStatus = "Cancelled";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
  });
});

module.exports = {
  createNewOrder,
  getOrderDetails,
  userOrders,
  cancelOrder,
  updateOrderAfterPayment,
};

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { initiateKhalti } = require("./khaltiPaymentController");

// CREATE ORDER
const createNewOrder = catchAsyncErrors(async (req, res, next) => {
  // Extract order details from request body
  const {
    shippingDetails,
    orderItems,
    totalPrice,
    shippingPrice,
    totalOrderPrice,
  } = req.body;

  if (totalOrderPrice > 1000) {
    return next(new ErrorHandler("Price cannot be greater than Rs 1000", 400));
  }

  // Create a new order document with the provided details
  const order = await Order.create({
    orderItems,
    shippingDetails,
    totalPrice,
    shippingPrice,
    totalOrderPrice,
    paidAt: new Date(),
    user: req.user._id,
  });

  // Reduce the stock of each product based on the quantity ordered
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.product);

    if (!product) {
      return next(
        new ErrorHandler(`Product not found for ID: ${orderItem.product}`, 404)
      );
    }

    const size = product.sizes.find((s) => s.name === orderItem.size);

    if (!size) {
      return next(
        new ErrorHandler(
          `Size not found for product ID: ${orderItem.product}`,
          404
        )
      );
    }

    // Update the stock of the product and size
    size.stock -= orderItem.quantity;
    product.stock -= orderItem.quantity;

    await product.save({ validateBeforeSave: false });
  }

  // Construct payment data for Khalti payment initiation
  const paymentData = {
    return_url: process.env.RETURN_URL,
    website_url: process.env.WEBSITE_URL,
    amount: totalOrderPrice * 100,
    purchase_order_id: order._id,
    purchase_order_name: "test",
    customer_info: {
      name: shippingDetails.name,
      phone: shippingDetails.phoneNo,
    },
  };

  // Initiate Khalti payment
  initiateKhalti(paymentData, req, res);
});

// UPDATE ORDER AFTER PAYMENT
const updateOrderAfterPayment = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.payment_id); // Find order by payment ID

  // If order not found, return error
  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }
  order.paymentInfo.id = req.payment_id;
  order.paymentInfo.status = req.status;

  await order.save();
  res.redirect("http://localhost:3000/payment/success");
});

// GET USERS ORDER
const userOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// GET ORDER DETAILS
const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  // Find order by ID and populate user and order items
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      model: "Product",
    });

  // If order not found, return error
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// CANCEL ORDER
const cancelOrder = catchAsyncErrors(async (req, res, next) => {
  // Extract order ID from request parameters
  const orderId = req.params.id;

  // Find order by ID and user
  const order = await Order.findOne({ _id: orderId, user: req.user._id });

  // If order not found, return error
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  // If order status is "Shipped", return error
  if (order.orderStatus === "Shipped") {
    return next(new ErrorHandler("Order already Shipped", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order already Delivered", 400));
  }

  // If order status is "Cancelled", return error
  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("Order is already cancelled", 400));
  }

  // Update order status to "Cancelled" and return stock to products
  order.orderStatus = "Cancelled";
  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity, o.size);
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
  });
});

// UPDATE STOCK
async function updateStock(id, quantity, sizeName) {
  const product = await Product.findById(id);

  const size = product.sizes.find((size) => size.name === sizeName);

  if (size) {
    size.stock += quantity;
  }

  product.stock += quantity;

  await product.save({ validateBeforeSave: false });
}

module.exports = {
  createNewOrder,
  getOrderDetails,
  userOrders,
  cancelOrder,
  updateOrderAfterPayment,
};

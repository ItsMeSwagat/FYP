const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateUser = catchAsyncErrors(async (req, res, next) => {
  const usertoken = req.cookies.usertoken;

  if (!usertoken) {
    return next(new ErrorHandler("Please login to access", 401));
  }

  const decodedData = jwt.verify(usertoken, process.env.JWT_SECRET);

  const user = await User.findById(decodedData.id);
  req.user = user;

  next();
});

const adminAuthenticate = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not authorized`, 403)
      );
    }

    next();
  };
};

module.exports = {
  authenticateUser,
  adminAuthenticate,
};

const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to authenticate user based on JWT token
const authenticateUser = catchAsyncErrors(async (req, res, next) => {
  // Extract JWT token from user's cookies
  const usertoken = req.cookies.usertoken;

  if (!usertoken) {
    return next(new ErrorHandler("Please login", 401));
  }

  // Verify and decode the JWT token using the secret key
  const decodedData = jwt.verify(usertoken, process.env.JWT_SECRET);

  // Find the user based on the decoded user ID from the token
  const user = await User.findById(decodedData.id);
  req.user = user; // Attach the user object to the request object for further use

  next();
});

// Middleware to authenticate admin based on user role
const adminAuthenticate = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      // If user's role is not authorized, return an error response
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

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/userToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const cartController = require("./cartController");

//REGISTER USER
const registerUser = catchAsyncErrors(async (req, res, next) => {
  // Upload user avatar to Cloudinary
  const cloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 200,
    crop: "scale",
  });
  // Extract user details from request body
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("Email Already exists!!", 400));
  }

  // Create user with provided details and uploaded avatar
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  // Create cart for the newly registered user
  await cartController.createCart(user);

  sendToken(user, 201, res); // Generate and send JWT token for user authentication
});

//LOGIN USER
const loginUser = catchAsyncErrors(async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate presence of email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  // Find user by email and include password field
  const user = await User.findOne({ email }).select("+password");

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Compare provided password with stored password hash
  const PasswordMatched = await user.comparePassword(password);

  if (!PasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Generate and send JWT token for user authentication
  sendToken(user, 200, res);
});

// Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  // res.cookie("usertoken", "", {
  //   maxAge: new Date(0),
  //   httpOnly: true,
  // });

  res.clearCookie("usertoken");

  req.user = null; // Set user object in request to null

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//FORGOT PASSWORD EMAIL VERIFICATION
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });

  // If user not found, return error
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Generate and save reset password token for user
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/password/reset/${resetToken}`;

  // Construct reset password URL
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  // Construct email message and URL
  const message = `Please Click Below to reset your Password: \n\n If your have not requested this mail then, Please ignore it`;
  const url = `${resetPasswordUrl}`;

  // Send reset password email with URL to user
  try {
    await sendEmail({
      email: user.email,
      subject: `Jass Sarees Reset password`,
      message,
      url,
      type: "resetPassword",
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email sending fails, reset user's reset password token and expire time
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(error.message, 500));
  }
});

//RESET PASSWORD
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Get reset password token from request parameters and hash it
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    // Find user by reset password token and ensure it's not expired
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // If user not found or token expired, return error
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  // Check if provided password matches confirm password
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Update user's password, reset password token, and expire time
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Generate and send JWT token for user authentication
  sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};

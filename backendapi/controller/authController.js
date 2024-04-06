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
  const cloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 200,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

   await cartController.createCart(user);

  sendToken(user, 201, res);
});

//LOGIN USER
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const PasswordMatched = await user.comparePassword(password);

  if (!PasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  // res.cookie("usertoken", "", {
  //   maxAge: new Date(0),
  //   httpOnly: true,
  // });

  res.clearCookie("usertoken");

  req.user = null;

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//FORGOT PASSWORD EMAIL VERIFICATION
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save();

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.BASE_URL}/password/reset/${resetToken}`;

  const message = `Please Click Below to reset your Password: \n\n If your have not requested this mail then, Please ignore it`;
  const url = `${resetPasswordUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: `Jass Sarees Reset password`,
      message,
      url,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(error.message, 500));
  }
});

//RESET PASSWORD
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};

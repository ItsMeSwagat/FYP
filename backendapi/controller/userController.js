const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/userToken");
const cloudinary = require("cloudinary");

//Load User
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//CHANGE PASSWORD
const changeUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const matchOldPassword = await user.comparePassword(req.body.oldPassword);

  if (!matchOldPassword) {
    return next(new ErrorHandler("Incorrect Old Password", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//UPDATE PROFILE
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findById(req.user.id);

  if (req.body.avatar) {
    try {
      if (user.avatar) {
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
      }

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 200,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } catch (error) {
      console.error("Error handling avatar:", error);
    }
  }

  user.set(newUserData);
  await user.save();

  console.log("User Updated Successfully");
  res.status(200).json({ success: true });
});

module.exports = {
  getUserDetails,
  changeUserPassword,
  updateProfile,
};

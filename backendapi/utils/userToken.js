const dotenv = require("dotenv");
dotenv.config();

const sendToken = (user, statusCode, res) => {
  const token = user.jwtToken();

  const options = {
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents client-side JS from reading the cookie
  };

  res.status(statusCode).cookie("usertoken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

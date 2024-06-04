const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const path = require("path");

app.use(
  express.json({
    limit: "50mb",
  })
);

if (process.env.NODE_ENV !== "PRODUCTION") {
  //config
  dotenv.config();
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressFileUpload());

const authRouters = require("./routes/authRoute");
app.use("/api/v1/auth", authRouters);

const userRouters = require("./routes/userRoute");
app.use("/api/v1/user", userRouters);

const adminUserRouters = require("./routes/adminUserRoute");
app.use("/api/v1/admin", adminUserRouters);

const productRouters = require("./routes/productRoute");
app.use("/api/v1", productRouters);

const reviewRouters = require("./routes/reviewRoute");
app.use("/api/v1", reviewRouters);

const adminProductRouters = require("./routes/adminProductRoute");
app.use("/api/v1/admin", adminProductRouters);

const adminVoucherRouters = require("./routes/voucherRoute");
app.use("/api/v1/admin/voucher", adminVoucherRouters);

const cartRouters = require("./routes/cartRoute");
app.use("/api/v1/cart", cartRouters);

const cartItemRouter = require("./routes/cartItemRoute");
app.use("/api/v1/cart_items", cartItemRouter);

const orderRouter = require("./routes/orderRoute");
app.use("/api/v1/order", orderRouter);

const adminOrderRouter = require("./routes/adminOrderRoute");
app.use("/api/v1/admin", adminOrderRouter);

const khaltiRouter = require("./routes/khaltiRoute");
app.use("/api/v1/khalti", khaltiRouter);

// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(errorMiddleware);

module.exports = app;

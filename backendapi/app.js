const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
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

const voucherRouters = require("./routes/voucherRoute");
app.use("/api/v1/voucher", voucherRouters);

const cartRouters = require("./routes/cartRoute");
app.use("/api/v1/cart", cartRouters);

const cartItemRouter = require("./routes/cartItemRoute");
app.use("/api/v1/cart_items", cartItemRouter);

app.use(errorMiddleware);

module.exports = app;

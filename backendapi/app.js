const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

const authRouters = require("./routes/authRoute");
app.use("/api/v1/auth", authRouters);

const userRouters = require("./routes/userRoute");
app.use("/api/v1/user", userRouters)

const adminUserRouters = require("./routes/adminUserRoute");
app.use("/api/v1/admin", adminUserRouters)

const productRouters = require("./routes/productRoute");
app.use("/api/v1", productRouters);

const reviewRouters = require("./routes/reviewRoute");
app.use("/api/v1", reviewRouters);

const adminProductRouters = require("./routes/adminProductRoute");
app.use("/api/v1/admin", adminProductRouters);





app.use(errorMiddleware);

module.exports = app

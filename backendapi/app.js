const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

const productRouters = require("./routes/productRoute");
app.use("/api/v1", productRouters);

const adminProductRouters = require("./routes/adminProductRoute");
app.use("/api/v1/admin", adminProductRouters);

module.exports = app

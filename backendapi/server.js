const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const { connectDB } = require("./config/db");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  //config
  dotenv.config();
}

//db connection
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Clothing store server is working at ${process.env.PORT}`);
});

// unhandled promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Unhandled promise Rejection shutting the server`);

  server.close(() => {
    process.exit(1);
  });
});

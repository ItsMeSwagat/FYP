const axios = require("axios");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// const initiateKhalti = catchAsyncErrors(async (paymentData, req, res) => {
//   const {
//     return_url,
//     website_url,
//     amount,
//     purchase_order_id,
//     purchase_order_name,
//   } = req.body;

//   const payload = {
//     return_url,
//     website_url,
//     amount,
//     purchase_order_id,
//     purchase_order_name,
//   };

//   const headers = {
//     Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//     "Content-Type": "application/json",
//   };

//   const response = await axios.post(
//     "https://a.khalti.com/api/v2/epayment/initiate/",
//     payload,
//     {
//       headers,
//     }
//   );

//   console.log(response.data);

//   res.json({
//     message: "khalti success",
//     payment_method: "khalti",
//     data: response.data,
//   });
// });

const initiateKhalti = catchAsyncErrors(async (paymentData, req, res) => {
  const headers = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
  console.log(headers);
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    paymentData,
    {
      headers,
    }
  );

  res.json({
    message: "khalti success",
    payment_method: "khalti",
    data: response.data,
  });
});

const handleKhaltiCallback = async (req, res, next) => {
  const { pidx, purchase_order_id, transaction_id, message } = req.query;

  try {
    if (message) {
      throw new ErrorHandler("Error Processing Khalti", 404);
    }

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    if (response.data.status !== "Completed") {
      throw new ErrorHandler("Payment not Completed", 404);
    }

    req.payment_id = purchase_order_id;
    req.status = response.data.status;
    next();
  } catch (error) {
    res.redirect("/checkout");
  }
};

module.exports = {
  initiateKhalti,
  handleKhaltiCallback,
};

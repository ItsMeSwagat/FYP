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

// const handleKhaltiCallback = catchAsyncErrors(
//   async (callBackData, req, res, next) => {
//     const { pidx, purchase_order_id, transaction_id, message } = req.query;

//     if (message) {
//       throw new ErrorHandler("Error Processing Khalti", 404);
//     }

//     const headers = {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       { headers }
//     );

//     const data = response.data;
//     console.log("lookup-data", data);

//     if (data?.status !== "Completed") {
//       req.payment_id = purchase_order_id;
//       req.status = "Failed";
//     } else {
//       req.payment_id = purchase_order_id;
//       req.status = data.status;
//     }

//     console.log("status", req.status);

//     next();
//   }
// );

const handleKhaltiCallback = catchAsyncErrors(async (pidx) => {
  const headers = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    { headers }
  );

  return response.data;
});

module.exports = {
  initiateKhalti,
  handleKhaltiCallback,
};

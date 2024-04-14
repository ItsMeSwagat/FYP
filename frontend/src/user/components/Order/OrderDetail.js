import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetail } from "../../../actions/orderAction";
import {
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Rating,
} from "@mui/material";
import { MdOutlineRateReview } from "react-icons/md";
import { createReview } from "../../../actions/reviewAction";
import { CREATE_REVIEW_RESET } from "../../../constants/reviewConstants";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading, error } = useSelector((state) => state.orderDetail);
  const { error: reviewError, success } = useSelector(
    (state) => state.createReview
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [productId, setProductId] = useState("");
  const [OpenDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    dispatch(getOrderDetail(id));
  }, [dispatch, id, error, reviewError, success]);

  const orderStatusSteps = [
    "Placed",
    "Processing",
    "Confirmed",
    "Shipped",
    "Delivered",
  ];

  const handleCancelOrder = () => {
    if (order.orderStatus === "Shipped") {
      toast.error("Cannot cancel the order. It is already shipped.");
    }
    if (order.orderStatus === "Delivered") {
      toast.error("Cannot cancel the order. It is already Delivered.");
    } else {
    }
  };

  const ReviewProductToggle = (id) => {
    OpenDialog ? setOpenDialog(false) : setOpenDialog(true);

    setProductId(id);
  };

  const ReviewToggle = (id) => {
    OpenDialog ? setOpenDialog(false) : setOpenDialog(true);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();

    console.log(productId);

    myForm.set("rating", rating);
    myForm.set("comment", review);
    myForm.set("productId", productId);

    dispatch(createReview(myForm));

    setOpenDialog(false);
  };

  const stepStyle = {
    padding: 2,
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#141414",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#141414",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#eddb8e",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#eddb8e",
      },
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <div className=" px-[8rem] py-[3rem] min-h-[60vh] flex flex-col gap-4">
            <div className=" w-full flex gap-5">
              {/* shipping Details */}
              <div className=" w-[70%] bg-white border-2 rounded-md p-4">
                <h1 className=" text-lg font-medium">Shipping Address</h1>
                <div className=" flex gap-3">
                  <label>Name:</label>
                  <p>{order.shippingDetails && order.shippingDetails.name}</p>
                </div>
                <div className=" flex gap-2">
                  <label>Address:</label>
                  <p>
                    {order.shippingDetails &&
                      `${order.shippingDetails.state},
                  ${order.shippingDetails.city}, ${order.shippingDetails.address}`}
                  </p>
                </div>
                <div className=" flex gap-2">
                  <label>Mobile No:</label>
                  <p>
                    {order.shippingDetails && order.shippingDetails.phoneNo}
                  </p>
                </div>
              </div>

              <div className=" w-[30%] bg-white border-2 rounded-md p-4">
                <h1 className="text-lg font-medium">Payment Information</h1>
                <div className=" flex items-center gap-3 pb-1">
                  <p>Status:</p>
                  <span>{order.paymentInfo && order.paymentInfo.status}</span>
                </div>
                <div className=" flex gap-2 bg-[#f5f5f5] rounded-md p-2 border-2">
                  <p>Order Total:</p>
                  <span>Rs {order.totalOrderPrice}</span>
                </div>
              </div>
            </div>

            {/* order tracking */}
            <div className=" bg-white p-5 border-2 rounded-md flex flex-col">
              <Stepper
                className=""
                alternativeLabel
                sx={stepStyle}
                activeStep={orderStatusSteps.indexOf(order.orderStatus)}
              >
                {orderStatusSteps.map((label, index) => (
                  <Step className="" key={label}>
                    <StepLabel>{label}</StepLabel>
                    <div>
                      {index ===
                        orderStatusSteps.indexOf(order.orderStatus) && (
                        <div className=" py-1">
                          {index === 0 && (
                            <p>The Order has been Placed Successfully.</p>
                          )}

                          {index === 1 && (
                            <p className=" text-center">
                              The Order is Being Processed.
                            </p>
                          )}

                          {index === 2 && (
                            <p className=" text-center">
                              The Order is confirmed and is being ready to be
                              shipped.
                            </p>
                          )}
                          {index === 3 && (
                            <p className=" text-center">
                              The Order has been shipped.
                            </p>
                          )}
                          {index === 4 && (
                            <p className=" text-center">
                              The Order is Delivered Successfully.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Step>
                ))}
              </Stepper>
              <div className=" flex justify-end">
                {order.orderStatus !== "Shipped" &&
                  order.orderStatus !== "Delivered" && (
                    <button
                      onClick={handleCancelOrder}
                      className="  bg-[#141414] text-white rounded-md border-2 px-4 py-1.5 hover:bg-[#eddb8e] hover:text-black font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>

            {/* orderItems */}
            <div className=" bg-white p-4 border-2 rounded-md flex flex-col gap-2">
              <h1>Order Items</h1>
              {order.orderItems &&
                order.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className=" flex justify-between items-center bg-[#f5f5f5] border-2 rounded-md p-2"
                  >
                    <div className=" w-[5rem] h-[5rem]">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-full h-full object-scale-down"
                      />
                    </div>
                    <div className=" flex flex-col items-center">
                      <Link to={`/product/${item.product._id}`}>
                        Name: {item.product.name}
                      </Link>
                      <p>Size: {item.size}</p>
                    </div>
                    <p>
                      {item.quantity} X Rs{item.product.price} =
                      <span> Rs{item.price}</span>
                    </p>

                    {order.orderStatus === "Delivered" && (
                      <button
                        onClick={() => ReviewProductToggle(item.product._id)}
                        className=" flex items-center gap-2  bg-[#141414] text-white rounded-md border-2 px-4 py-1.5 hover:bg-[#eddb8e] hover:text-black font-medium"
                      >
                        <MdOutlineRateReview />
                        Submit Review
                      </button>
                    )}
                  </div>
                ))}

              <Dialog
                className=" flex flex-col"
                open={OpenDialog}
                onClose={ReviewToggle}
              >
                <DialogTitle className=" font-medium">
                  Submit Rating & Review
                </DialogTitle>
                <DialogContent className=" w-[30rem] flex flex-col gap-3 ">
                  <Rating onChange={(e) => setRating(e.target.value)} />

                  <textarea
                    className=" border-2 p-1 rounded-md bg-[#f5f5f5]"
                    rows={4}
                    placeholder="Write review here..."
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <button
                    onClick={() => submitReviewHandler()}
                    className=" bg-[#eddb8e] text-black rounded-md border-2 px-4 py-1.5 hover:bg-[#141414] hover:text-white font-medium"
                  >
                    Submit
                  </button>
                  <button
                    onClick={ReviewToggle}
                    className="  bg-[#141414] text-white rounded-md border-2 px-4 py-1.5 hover:bg-[#eddb8e] hover:text-black font-medium"
                  >
                    Cancel
                  </button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;

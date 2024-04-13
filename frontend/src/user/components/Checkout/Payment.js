import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProcess from "./CheckoutProcess";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { clearErrors, createOrder } from "../../../actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const { cart, shippingDetails } = useSelector((state) => ({
    cart: state.cart.cart,
    shippingDetails: state.cart.shippingDetails,
  }));

  const { loading, error } = useSelector((state) => state.newOrder);
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));

  const { subtotal, shippingCharge, OrderTotal } = orderData;

  const handlePayment = async () => {
    const order = {
      shippingDetails,
      orderItems: cart.cart?.cartItems,
      totalPrice: orderData.subtotal,
      shippingPrice: orderData.shippingCharge,
      totalOrderPrice: orderData.OrderTotal,
    };
    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckoutProcess activeProcess={2} />
          <div className="flex justify-center items-center min-h-[60vh] px-[8rem] py-[1rem]">
            <div className=" bg-white rounded-md border-2 shadow-md p-4 flex flex-col gap-3">
              <div className=" bg-[#f5f5f5] border-2 rounded-md p-4">
                <h1 className=" text-lg font-medium">Shipping Address</h1>
                <div className=" flex gap-3">
                  <label>Name:</label>
                  <p>{shippingDetails.name}</p>
                </div>
                <div className=" flex gap-2">
                  <label>Address:</label>
                  <p>
                    {shippingDetails.state},{shippingDetails.city},
                    {shippingDetails.address}
                  </p>
                </div>
                <div className=" flex gap-2">
                  <label>Mobile No:</label>
                  <p>{shippingDetails.phoneNo}</p>
                </div>
              </div>

              <div className="">
                <h1 className=" text-lg font-medium pb-2">Order Summery</h1>
                <div className=" bg-[#f5f5f5]  min-h-[5rem] flex flex-col gap-5 justify-around p-4 rounded-md border-2">
                  <div className=" flex justify-between">
                    <p>SubTotal:</p>
                    <p>Rs {subtotal}</p>
                  </div>
                  <div className=" flex justify-between">
                    <p>Delivery Charge:</p>
                    <p className=" text-green-400">-Rs {shippingCharge}</p>
                  </div>

                  <div className=" flex justify-between">
                    <p>Order Total:</p>
                    <p>Rs {OrderTotal} </p>
                  </div>
                  <button
                    onClick={handlePayment}
                    className=" bg-[#141414] text-white py-2 hover:bg-[#5E338D] font-medium rounded-md"
                  >
                    Pay Via Khalti
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Payment;

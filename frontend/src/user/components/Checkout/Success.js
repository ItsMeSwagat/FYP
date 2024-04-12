import React from "react";
import CheckoutProcess from "./CheckoutProcess";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Success = () => {
  const dispatch = useDispatch();
  const { cart, shippingDetails } = useSelector((state) => ({
    cart: state.cart.cart,
    shippingDetails: state.cart.shippingDetails,
  }));
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));

  const order = {
    shippingDetails,
    orderItems: cart.cart?.cartItems,
    totalPrice: orderData.subtotal,
    shippingCharge: orderData.shippingCharge,
    totalOrderPrice: orderData.OrderTotal,
  };

  return (
    <>
      <CheckoutProcess activeProcess={3} />
      <div className=" px-[8rem] py-[2rem] min-h-[60vh]">
        <div className=" flex flex-col justify-center items-center gap-5 text-5xl">
          <FaCheckCircle className=" text-[10rem] text-[#eddb8e]" />
          <h1 className=" text-center pb-5">
            Your Order has been placed Successfully.
            <br /> Thank you
          </h1>
          <Link
            to={`/orders/user`}
            className=" text-3xl bg-[#141414] text-white px-5 py-2 hover:bg-[#eddb8e] hover:text-black font-medium"
          >
            View Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;

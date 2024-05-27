import React, { useEffect } from "react";
import CheckoutProcess from "./CheckoutProcess";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { clearCart } from "../../../actions/cartAction";

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <CheckoutProcess activeProcess={3} />
      <div className=" px-[8rem] py-[2rem] min-h-[60vh]">
        <div className=" flex flex-col justify-center items-center gap-5 text-xl md:text-2xl lg:text-3xl xl:text-5xl">
          <FaCheckCircle className=" text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] text-[#eddb8e]" />
          <h1 className=" text-center pb-5">
            Your Order has been placed Successfully.
            <br /> Thank you
          </h1>
          <Link
            to={`/orders/user`}
            className=" text-xl lg:text-2xl xl:text-3xl bg-[#141414] text-white px-5 py-2 hover:bg-[#eddb8e] hover:text-black font-medium"
          >
            View Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;

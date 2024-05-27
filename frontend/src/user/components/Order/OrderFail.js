import React from "react";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const OrderFail = () => {
  return (
    <div className=" px-[8rem] py-[2rem] min-h-[60vh]">
      <div className=" flex flex-col justify-center items-center gap-5 text-xl md:text-2xl lg:text-3xl xl:text-5xl">
        <MdError className=" text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] text-[#eddb8e]" />
        <h1 className=" text-center pb-5">
          There was an error while processing the order.
          <br /> Please Try again.
        </h1>
        <Link
          to={`/`}
          className=" text-xl lg:text-2xl xl:text-3xl bg-[#141414] text-white px-5 py-2 hover:bg-[#eddb8e] hover:text-black font-medium"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default OrderFail;

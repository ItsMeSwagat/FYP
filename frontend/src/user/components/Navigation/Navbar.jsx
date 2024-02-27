import React from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className=" relative bg-white">
      {/* top navbar */}
      <div className=" w-full h-[2.5rem] bg-[#141414] flex justify-center items-center">
        <p className=" font-medium text-lg text-white">
          Free Shipping on products above{" "}
          <span className=" text-[#EDDB8D]">Rs 10000</span>{" "}
        </p>
      </div>

      {/* main navbar */}
      <div className=" w-full h-[4rem] flex justify-around items-center border-2 border-b-black">
        {/* logo */}
        <div className="">
          <h1 className=" text-3xl font-bold">JASs <span className=" text-[#EDDB8D]">Sarees</span></h1>
        </div>
        {/* pages */}
        <div className=" flex gap-4 text-lg font-semibold">
          <Link>Home</Link>
          <Link>Products</Link>
          <Link>Shop</Link>
          <Link>Contact</Link>
        </div>

        {/*  */}
        <div className=" flex items-center">
          <div className=" flex gap-4">
            <button className=" bg-[#EDDB8D] px-5 py-[1.5] rounded-[5px] font-medium">Sign In</button>
            <button className=" bg-black text-white font-medium px-3 py-1.5 rounded-[5px]">Create an Account</button>
          </div>
        </div>
      </div>

      <div className=" fixed bottom-5 right-5 bg-[#141414] rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
        <FaCartShopping size={30} color="#EDDB8D" />
      </div>
    </div>
  );
};

export default Navbar;

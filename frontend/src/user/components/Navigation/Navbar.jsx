import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className=" sticky top-0 bg-white z-10">
      {/* top navbar */}
      <div className=" w-full h-[2.5rem] bg-[#141414] flex justify-center items-center">
        <p className=" font-medium text-lg text-white">
          Free Shipping on products above{" "}
          <span className=" text-[#EDDB8D]">Rs 10000</span>{" "}
        </p>
      </div>

      {/* main navbar */}
      <div className="  w-full h-[4rem] flex justify-between items-center px-[8rem] border-2 border-b-black">
        {/* logo */}
        <div className="">
          <h1 className=" text-3xl font-bold">
            JASs <span className=" text-[#EDDB8D]">Sarees</span>
          </h1>
        </div>
        {/* pages */}
        <div className=" flex gap-4 text-lg font-semibold">
          {/* search bar */}
          <div className=" flex items-center border-2 border-black w-[18rem] h-[2.3rem] rounded-[5px]">
            <input
              type="text"
              name=""
              className=" w-full h-full outline-none text-black text-[1rem] pl-2 placeholder:text-black rounded-[5px]"
              placeholder=" Search..."
            />
            <button className=" w-[2.5rem] h-full bg-[#EDDB8D] flex justify-center items-center rounded-tr-[5px] rounded-br-[5px] border-l-2 border-black">
              <FiSearch size={25} />
            </button>
          </div>
        </div>

        {/*  */}
        <div className=" flex items-center">
          <div className=" flex gap-4">
            <button className=" bg-[#EDDB8D] px-5 py-[1.5] rounded-[5px] font-medium">
              Sign In
            </button>
            <button className=" bg-black text-white font-medium px-3 py-1.5 rounded-[5px]">
              Create an Account
            </button>
          </div>
        </div>
      </div>

      <div className=" z-50 fixed bottom-5 right-5 bg-[#141414] rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
        <FaCartShopping size={30} color="#EDDB8D" />
        <p className=" bg-[#EDDB8D] w-[2rem] h-[2rem] rounded-full fixed bottom-2.5 right-[3.5rem] flex justify-center items-center">
          0
        </p>
      </div>
    </div>
  );
};

export default Navbar;

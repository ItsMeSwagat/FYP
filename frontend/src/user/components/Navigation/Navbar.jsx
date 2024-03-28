import React, { Fragment } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Search from "../Search/Search";
import { useSelector } from "react-redux";
import { MdAccountBox } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {/* top navbar */}
      <div className=" w-full h-[2.5rem] bg-[#141414] flex justify-center items-center">
        <p className=" font-medium text-sm xl:text-lg text-white">
          Free Shipping on products above{" "}
          <span className=" text-[#EDDB8D]">Rs 10000</span>{" "}
        </p>
      </div>

      {/* main navbar */}
      <div className=" z-10 bg-white sticky top-0  w-full h-[4.5rem] flex justify-between items-center px-[4rem] xl:px-[8rem] border-2 ">
        {/* logo */}
        <div className="">
          <Link to={`/`}>
            <h1 className=" text-2xl lg:text-3xl font-bold">
              JASs <span className=" text-[#EDDB8D]">Sarees</span>
            </h1>
          </Link>
        </div>
        {/* pages */}
        <Search />

        {/* buttons */}
        {!isAuthenticated ? (
          <div className=" md:hidden lg:flex items-center">
            <div className=" flex gap-4">
              <Link className=" bg-[#EDDB8D] px-5 py-[1.5] rounded-[5px] font-medium flex items-center">
                Sign In
              </Link>
              <Link className=" bg-black text-white font-medium px-3 py-1.5 rounded-[5px]">
                Create an Account
              </Link>
            </div>
          </div>
        ) : (
          <div className=" md:hidden lg:flex items-center">
            <div className=" flex gap-4">
              <Link
                to={`/account`}
                className=" bg-[#EDDB8D] px-2 py-[1.5] rounded-[5px] font-medium flex items-center hover:bg-black hover:text-[#eddb8e]"
              >
                <MdAccountBox size={20} className="" />
              </Link>
              <Link className=" bg-black text-white font-medium px-2 py-1.5 rounded-[5px] hover:bg-[#eddb8e] hover:text-black">
                <FaHeart size={20} />
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className=" lg:hidden">
          <IoMenu className=" size-8" />
        </div>
      </div>

      <div className=" z-50 fixed bottom-5 right-5 bg-[#141414] rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
        <FaCartShopping size={30} color="#EDDB8D" />
        <p className=" bg-[#EDDB8D] w-[2rem] h-[2rem] rounded-full fixed bottom-2.5 right-[3.5rem] flex justify-center items-center">
          0
        </p>
      </div>
    </Fragment>
  );
};

export default Navbar;

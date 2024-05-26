import React, { Fragment, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Search from "../Search/Search";
import { useSelector } from "react-redux";
import { MdAccountBox } from "react-icons/md";
import { FaStore, FaSearch } from "react-icons/fa";
import ProfileDropdown from "../Dropdown/ProfileDropdown";
import { MdDashboard } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [openProfile, setOpenProfile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleProfileClick = () => {
    setOpenProfile((prev) => !prev);
  };

  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
  };

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const hideCartButtonPages = [
    "/cart",
    "/checkout",
    "/shipping",
    "/confirmorder",
    "/payment/process",
    "/success",
  ];

  const ShowCartButton = !hideCartButtonPages.includes(location.pathname);

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
      <div className=" z-10 bg-white sticky top-0  w-full h-[4.5rem] flex justify-between items-center px-[1rem] md:px-[2rem] xl:px-[8rem] border-2 ">
        {/* logo */}
        <div className="">
          <Link to={`/`}>
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold">
              JASs <span className=" text-[#EDDB8D]">Sarees</span>
            </h1>
          </Link>
        </div>
        {/* pages */}
        <div className=" hidden lg:flex">
          <Search />
        </div>
        {/* Mobile Menu */}

        {/* buttons */}
        <div className=" flex items-center gap-3">
          <div className=" lg:hidden">
            <FaSearch onClick={handleSearchClick} size={20} />
          </div>
          {!isAuthenticated ? (
            <div className=" flex items-center pl-2">
              <div className=" flex gap-1 lg:gap-4">
                <Link
                  to={`/login`}
                  className=" bg-[#EDDB8D] px-2 py-1 md:px-5 md:py-[1.5] rounded-[5px] font-medium text-sm flex items-center"
                >
                  Sign In
                </Link>
                <Link
                  to={`/signup`}
                  className=" bg-black text-white font-medium px-2 py-1 md:px-3 md:py-1.5 text-sm rounded-[5px]"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          ) : (
            <div className=" lg:flex items-center">
              <div className=" flex gap-4">
                <Link
                  onClick={handleProfileClick}
                  className=" bg-[#EDDB8D] px-2 py-1.5 rounded-[5px] font-medium flex items-center hover:bg-black hover:text-[#eddb8e]"
                >
                  <MdAccountBox size={20} className="" />
                </Link>

                <Link
                  to={`/products`}
                  className=" bg-black text-white font-medium px-2 py-1.5 rounded-[5px] hover:bg-[#eddb8e] hover:text-black"
                >
                  <FaStore size={20} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {ShowCartButton && (
        <Link
          to={`/cart`}
          className=" z-50 fixed bottom-5 right-5 bg-[#141414] rounded-full w-[3rem] h-[3rem] lg:w-[3.5rem] lg:h-[3.5rem] flex justify-center items-center"
        >
          <FaCartShopping size={25} color="#EDDB8D" />
          <p className=" bg-[#EDDB8D] w-[1.5rem] h-[1.5rem] lg:w-[2rem] lg:h-[2rem] rounded-full fixed bottom-2.5 lg:right-[3.5rem] right-[3rem] flex justify-center items-center">
            {cart.cart?.cartItems.length}
          </p>
        </Link>
      )}
      {openProfile && <ProfileDropdown setOpenProfile={setOpenProfile} />}

      {searchOpen && (
        <div className=" w-full flex justify-center gap-4 text-lg font-semibold">
          {/* search bar */}
          <form
            onSubmit={searchHandler}
            className=" fixed z-10 top-[7rem] flex justify-center items-center border border-black w-[80%] xl:w-[30rem] h-[3rem] rounded-[10px] overflow-hidden"
          >
            <input
              type="text"
              name=""
              className=" w-full h-full outline-none text-black text-[1rem] pl-2 placeholder:text-black"
              placeholder=" Search Products..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              className=" w-[3.5rem] h-full bg-[#EDDB8D] flex justify-center items-center rounded-tr-[5px] rounded-br-[5px] border-l-2 border-black"
            >
              <FiSearch size={25} />
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;

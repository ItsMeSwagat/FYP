import React, { Fragment, useEffect, useState } from "react";
import MainBanner from "../Banner/MainBanner";
import categoryImg from "../../../assets/banner 2.jpg";
import category2Img from "../../../assets/banner 3.webp";
import Product from "../Product/ProductCard";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Marquee from "react-fast-marquee";
import { TbTruckDelivery, TbDiscountCheckFilled } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { FaLuggageCart } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(8);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct("", currentPage, resultPerPage));
  }, [dispatch, error, currentPage, resultPerPage]);

  const categories = [
    { name: "Reliable", icon: FaLuggageCart },
    { name: "Fast Delivery", icon: TbTruckDelivery },
    { name: "Authentic Sarees", icon: IoShieldCheckmark },
    { name: "Vouchers", icon: BiSolidDiscount },
    { name: "High Discounts", icon: CiDiscount1 },
    { name: "Verified products", icon: TbDiscountCheckFilled },
  ];

  const loadMoreProducts = () => {
    setResultPerPage((prevresultPerPage) => prevresultPerPage + 8);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-[1rem] md:mx-[2rem] lg:mx-[4rem] xl:mx-[8rem]">
          <ToastContainer />
          {/* banner */}
          <div className=" relative w-full h-[10rem] md:h-[12rem] lg:h-[15rem] xl:h-[20rem] flex justify-between items-center gap-4 mt-[2rem] ">
            <div className=" w-full md:w-[60%] h-[100%] bg-black rounded-[10px] overflow-hidden object-scale-down">
              <MainBanner />
            </div>

            <div className=" w-[45%] h-[100%] hidden md:flex flex-col gap-2 md:gap-4">
              <div className=" bg-black h-[50%] rounded-[10px] overflow-hidden">
                <img
                  src={categoryImg}
                  alt=""
                  className=" w-full h-full object-cover object-top"
                />
              </div>
              <div className=" bg-[#EDDB8D] h-[50%] rounded-[10px] object-cover overflow-hidden">
                <img
                  src={category2Img}
                  alt=""
                  className=" w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className=" relative py-[2rem]">
            <div className=" border-2 bg-white w-full p-4 rounded-[10px] my-[1rem] xl:my-[2rem]">
              <Marquee className=" w-full h-full">
                {categories.map((cat, i) => (
                  <span
                    key={i}
                    className={`category-link 
                     
                    bg-[#f3f3f3] border-2 cursor-pointer md:w-[10rem] lg:w-[13rem] lg:h-[4rem] xl:w-[15rem] xl:h-[5rem] rounded-[10px] flex justify-center items-center mx-[2rem] px-[1rem] font-bold text-sm md:text-base`}
                  >
                    <cat.icon size={50} color="#eddb8e" className="mr-2" />
                    {cat.name}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>

          {/* Featured products */}
          <div className=" w-full bg-white mb-[2rem] py-[1rem] rounded-[15px] lg:px-4">
            <h1 className=" text-xl md:text-2xl xl:text-3xl font-semibold pl-4">Just For You</h1>
            <div className=" flex flex-col justify-center items-center">
              <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 py-4">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              {products.length < productsCount && (
                <div className="flex justify-center">
                  <button
                    onClick={loadMoreProducts}
                    className=" bg-[#141414] hover:bg-[#eddb8e] hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Container */}
          <div></div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;

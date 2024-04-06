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

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" lg:mx-[4rem] xl:mx-[8rem]">
          <ToastContainer />
          {/* banner */}
          <div className=" relative w-full h-[20rem] flex justify-between items-center gap-4 mt-[2rem] ">
            <div className=" w-[60%] h-[100%] bg-black rounded-[10px] overflow-hidden object-cover">
              <MainBanner />
            </div>

            <div className=" w-[45%] h-[100%] flex flex-col gap-4">
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
            <h1 className=" text-3xl font-semibold">Categories</h1>
            <div className=" bg-white w-full h-[10rem] rounded-[10px] my-[2rem]">
              <Marquee className=" w-full h-full">
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
                <div className=" bg-[#f5f5f5] w-[8rem] h-[8rem] rounded-[10px] flex justify-center items-center mx-[2rem]">
                  Fast Delivery
                </div>
              </Marquee>
            </div>
          </div>

          {/* Featured products */}
          <div className=" w-full bg-white mb-[2rem] py-[1rem] rounded-[15px] px-4">
            <h1 className=" text-3xl font-semibold pl-4">Just For You</h1>
            <div className=" flex justify-center items-center">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-4">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
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

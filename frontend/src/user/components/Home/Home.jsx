import React, { Fragment } from "react";
import MainBanner from "../Banner/MainBanner";
import categoryImg from "../../../assets/banner 2.jpg";
import category2Img from "../../../assets/banner 3.webp";
import Product from "../Product/Product";

const Home = () => {
  const product = {
    name: "Solid Plain  Bollywood Silk Blend Saree ",
    images: [
      {
        url: "https://static-01.daraz.com.np/p/f0935452969470613aa1cceffe5b5b6e.jpg",
      },
    ],
    price: "Rs 15000",
    _id: "swagat",
  };
  return (
    <Fragment>
      {/* banner */}
      <div className=" relative w-full h-[20rem] flex justify-between items-center gap-4 px-[8rem] my-[3rem] ">
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
      <div className=" relative px-[8rem] py-[2rem]">
        <h1 className=" text-3xl font-semibold">Categories</h1>
        <div className=" grid grid-flow-col justify-between items-center py-4">
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            1
          </div>
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            2
          </div>
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            3
          </div>
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            4
          </div>
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            5
          </div>
          <div className=" bg-slate-500 w-[10rem] h-[10rem] flex justify-center items-center rounded-[10px]">
            6
          </div>
        </div>
      </div>

      <div className=" px-[8rem] py-[2rem]">
        <h1 className=" text-3xl font-semibold">Just For You</h1>
        <div className=" container flex flex-wrap justify-start gap-[1.5rem] py-4 ">
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

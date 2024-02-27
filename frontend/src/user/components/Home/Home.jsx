import React, { Fragment } from "react";
import MainBanner from "../Banner/MainBanner";

const Home = () => {
  return (
    <Fragment>
      {/* banner */}
      <div className=" relative w-full h-[25rem] flex justify-between items-center gap-4 px-[8rem] ">
        <div className=" w-[55%] h-[21rem] bg-black rounded-[10px] overflow-hidden object-cover">
          <MainBanner />
        </div>

        <div className=" w-[45%] flex flex-col gap-4">
          <div className=" bg-black h-[10rem] rounded-[10px]">Category 1</div>
          <div className=" bg-[#EDDB8D] h-[10rem] rounded-[10px]">Category 2</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

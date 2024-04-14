import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className=" text-[5rem] font-semibold">
        Oop<span className=" text-[#eddb8e]">sie!!!</span>
      </h1>
      <p className=" text-[3rem] font-medium">
        Sorry, 404 ERROR PAGE NOT FOUND.
      </p>
      <Link
        to={"/"}
        className=" bg-[#141414] px-8 py-3 text-2xl font-medium hover:bg-[#eddb8e] text-white hover:text-black"
      >
        GO BACK
      </Link>
    </div>
  );
};

export default ErrorPage;

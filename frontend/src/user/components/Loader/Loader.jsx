import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <>
      <div className=" w-full h-screen flex justify-center items-center">
        <HashLoader size={100} color="#EDDB8D" />
      </div>
    </>
  );
};

export default Loader;

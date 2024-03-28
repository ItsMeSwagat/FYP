import React, { Fragment, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {useNavigate} from 'react-router-dom'

const Search = () => {
  const [ keyword, setKeyword ] = useState("");

  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <div className=" flex gap-4 text-lg font-semibold">
        {/* search bar */}
        <form onSubmit={searchHandler} className=" hidden md:flex items-center border-2 border-black w-[20rem] xl:w-[30rem] h-[3rem] rounded-[10px] overflow-hidden">
          <input
            type="text"
            name=""
            className=" w-full h-full outline-none text-black text-[1rem] pl-2 placeholder:text-black"
            placeholder=" Search Products..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className=" w-[3.5rem] h-full bg-[#EDDB8D] flex justify-center items-center rounded-tr-[5px] rounded-br-[5px] border-l-2 border-black">
            <FiSearch size={25} />
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Search;

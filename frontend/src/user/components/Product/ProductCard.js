import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const maxNameLength = 20; // Define the maximum length of the product name
  const trimmedName =
    product.name.length > maxNameLength
      ? product.name.substring(0, maxNameLength) + "..." // Trim the name if it's too long
      : product.name;

  const options = {
    edit: false,
    color: "#141414",
    activeColor: "#Eddb8d",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link
      className=" bg-[#f5f5f5] w-[15rem] h-[25rem] flex flex-col justify-between items-center hover:shadow-xl rounded-[10px] overflow-hidden flex-shrink-0 border-2 mb-4 "
      to={`/product/${product._id}`}
    >
      <img
        src={product.images[0].url}
        alt={product.name}
        className=" w-full h-[65%] object-cover object-top"
      />
      <div className=" h-[35%] w-full flex flex-col items-center py-2 border-t-2 border-black">
        <p className=" font-medium">{trimmedName}</p>
        <div className=" flex items-center">
          <ReactStars {...options} />{" "}
          <span className=" text-sm"> ({product.numOfReviews} Reviews)</span>
        </div>
        <p className=" font-medium">Rs{product.price}</p>
        <Link to={``}>
          <button className=" z-50 bg-[#Eddb8e] flex justify-center items-center gap-2 s rounded-[10px] px-[3rem] py-1.5 hover:bg-black hover:text-white">
            Add to Cart
            <FaShoppingCart />
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;

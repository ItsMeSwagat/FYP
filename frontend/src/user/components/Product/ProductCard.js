import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart } from "../../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const maxNameLength = 20;
  const trimmedName =
    product.name.length > maxNameLength
      ? product.name.substring(0, maxNameLength) + "..."
      : product.name;

  const options = {
    size: "small",
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  const AddCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
    }
    const data = { productId: product._id, size: selectedSize };
    dispatch(addToCart(data));
  };

  const [selectedSize, setSelectedSize] = useState("");
  

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].name);
    }
  }, [product]);

  return (
    <Link
      className=" relative bg-[#f5f5f5] w-[15rem] h-[25rem] flex flex-col justify-between items-center hover:shadow-xl rounded-[10px] overflow-hidden flex-shrink-0 border-2 mb-4 "
      to={`/product/${product._id}`}
    >
      <div className=" absolute top-1 right-1 bg-[#eddb8e] px-3 py-1 rounded-lg text-sm">{product.discountPercent}% Off</div>
      <img
        src={product.images[0].url}
        alt={product.name}
        className=" w-full h-[65%] object-cover object-top"
      />
      <div className=" h-[35%] w-full flex flex-col gap-1 items-center py-2 border-t-2 border-black">
        <p className=" font-medium">{trimmedName}</p>
        <div className=" flex items-center">
          <Rating {...options} />{" "}
          <span className=" text-sm"> ({product.numOfReviews} Reviews)</span>
        </div>
        <p className=" font-medium">Rs{product.price}</p>

        <button
          onClick={AddCart}
          className=" bg-[#Eddb8e] flex justify-center items-center gap-2 s rounded-[10px] px-[3rem] py-1.5 hover:bg-black hover:text-white"
        >
          Add to Cart
          <FaShoppingCart />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

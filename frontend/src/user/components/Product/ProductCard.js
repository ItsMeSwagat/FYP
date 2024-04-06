import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart } from "../../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

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
    edit: false,
    color: "#141414",
    activeColor: "#Eddb8d",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const AddCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
    }
    const data = { productId: product._id, size: selectedSize };
    console.log(data);
    dispatch(addToCart(data));
    toast.success("Product Added to Cart");
  };

  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].name);
    }
  }, [product]);

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

        <button
          onClick={AddCart}
          className=" z-50 bg-[#Eddb8e] flex justify-center items-center gap-2 s rounded-[10px] px-[3rem] py-1.5 hover:bg-black hover:text-white"
        >
          Add to Cart
          <FaShoppingCart />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

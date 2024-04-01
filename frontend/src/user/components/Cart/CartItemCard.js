import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const CartItemCard = ({ item, removeCartItem }) => {
  return (
    <div className=" flex gap-3 px-2 py-4">
      <div className=" w-[6rem] h-[6rem] overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt="pimage"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" flex flex-col gap-1">
        <Link
          to={`/product/${item.product}`}
          className=" text-lg font-semibold"
        >
          {item.name}
        </Link>
        <span className="">Price: Rs{item.price}</span>
        <MdDelete onClick={() => removeCartItem(item.product)} size={20} className=" text-red-500 hover:shadow-lg cursor-pointer" />
      </div>
    </div>
  );
};

export default CartItemCard;

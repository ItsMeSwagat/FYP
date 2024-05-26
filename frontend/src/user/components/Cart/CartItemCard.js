import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { removeCartItem, updateCartItem } from "../../../actions/cartAction";

const CartItemCard = ({ item, dispatch }) => {
  const updateItem = (qty) => {
    const data = {
      data: { quantity: item.quantity + qty },
      cartItemId: item?._id,
    };
    dispatch(updateCartItem(data));
  };

  const removeItem = () => {
    dispatch(removeCartItem(item?._id));
  };

  const sizeStock = item.product.sizes.find(
    (size) => size.name === item.size
  )?.stock;
  const isStockReached = sizeStock <= item.quantity;

  return (
    <>
      <div className=" flex gap-3 px-2 py-4">
        <div className=" w-[3rem] h-[3rem] md:w-[6rem] md:h-[6rem] overflow-hidden flex-shrink-0">
          <img
            src={item.product.images[0].url}
            alt="pimage"
            className=" w-full h-full object-scale-down"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <Link
            to={`/product/${item.product._id}`}
            className=" text-sm md:text-lg font-semibold"
          >
            {item.product.name}
          </Link>
          <div className=" flex items-center gap-2 text-sm md:text-lg">
            Color:{" "}
            <div
              className="w-[1rem] h-[1rem] rounded-full"
              style={{ backgroundColor: item.product.color }}
            ></div>
          </div>
          <MdDelete
            onClick={removeItem}
            size={20}
            className=" text-red-500 hover:shadow-lg cursor-pointer"
          />
        </div>
      </div>

      <div className=" py-4">
        <div className=" w-[5rem] md:w-[8rem] rounded-[10px] flex gap-4 overflow-hidden ">
          <button
            disabled={item.quantity <= 1}
            onClick={() => updateItem(-1)}
            className=" bg-[#eddb8e] hover:bg-[#141414] hover:text-white w-5 h-8 md:w-8 md:h-8  text-center text-sm md:text-lg font-bold"
          >
            -
          </button>
          <input
            value={item.quantity}
            readOnly
            type=""
            className=" w-[.5rem] h-[2rem] md:w-[2rem] md:h-[2rem] text-lg text-center"
          />
          <button
            onClick={() => updateItem(1)}
            disabled={isStockReached}
            className=" bg-[#eddb8e] hover:bg-[#141414] hover:text-white w-5 h-8 md:w-8 md:h-8 text-center text-sm md:text-lg font-bold "
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;

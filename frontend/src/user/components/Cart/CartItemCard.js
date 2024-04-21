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
  return (
    <>
      <div className=" flex gap-3 px-2 py-4">
        <div className=" w-[6rem] h-[6rem] overflow-hidden flex-shrink-0">
          <img
            src={item.product.images[0].url}
            alt="pimage"
            className=" w-full h-full object-scale-down"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <Link
            to={`/product/${item.product._id}`}
            className=" text-lg font-semibold"
          >
            {item.product.name}
          </Link>
          <div className=" flex items-center gap-2">
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
        <div className=" w-[8rem] rounded-[10px] flex gap-4 overflow-hidden ">
          <button
            disabled={item.quantity <= 1}
            onClick={() => updateItem(-1)}
            className=" bg-[#eddb8e] w-8 h-8  text-center text-lg font-bold"
          >
            -
          </button>
          <input
            value={item.quantity}
            readOnly
            type=""
            className=" w-[2rem] h-[2rem] text-lg text-center"
          />
          <button
            onClick={() => updateItem(1)}
            className=" bg-[#eddb8e] w-8 h-8  text-center text-lg font-bold "
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;

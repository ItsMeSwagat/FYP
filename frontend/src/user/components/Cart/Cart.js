import React from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../../../actions/cartAction";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock, size) => {
    const newQuantity = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQuantity, size));
  };

  const decreaseQuantity = (id, quantity, size) => {
    const newQuantity = quantity - 1;

    if (quantity <= 1) {
      return;
    }
    dispatch(addToCart(id, newQuantity, size));
  };

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className=" w-full min-h-[80vh] flex justify-center items-center">
          <div className=" flex flex-col justify-center items-center gap-5">
            <FaCartArrowDown className=" text-[15rem]" />
            <p className=" text-4xl font-medium uppercase ">
              Cart Is Empty.{" "}
              <span className=" text-[#eddb8e]">Please Add the Product</span>
            </p>
            <Link to={`/products`}>
              <button className=" bg-[#141414] text-white uppercase border-2 px-5 py-2 text-3xl hover:bg-[#eddb8e] hover:text-black hover:shadow-lg rounded-md font-medium">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className=" min-h-[60vh] px-[8rem] py-[2rem]">
          <div className=" bg-[#eddb8e] border-2 box-border  w-full grid grid-cols-[4fr,2fr,1fr,1fr] m-auto p-2 rounded-md">
            <p>Product</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>SubTotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-[#fff] min-h-[8rem] grid grid-cols-[4fr,2fr,1fr,1fr] box-border border-2 border-t-0 rounded-md"
              >
                <CartItemCard item={item} removeCartItem={deleteCartItem} />

                <div className=" py-4">
                  <div className=" w-[8rem] rounded-[10px] flex gap-4 overflow-hidden ">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity, item.size)
                      }
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
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock,
                          item.size
                        )
                      }
                      className=" bg-[#eddb8e] w-8 h-8  text-center text-lg font-bold "
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-lg font-medium py-4">
                  <p>{item.size}</p>
                </div>

                {/* Subtotal */}
                <div className=" py-4 text-lg font-medium">
                  <p>Rs{item.price * item.quantity}</p>
                </div>
              </div>
            ))}

          <div className="flex gap-5 justify-end mt-5">
            <div className=" bg-white w-[20rem] min-h-[5rem] flex flex-col gap-5 justify-around p-4 rounded-md border-2">
              <div className=" flex justify-around">
                <p>Grand Total:</p>
                <p>Rs {`600`}</p>
              </div>

              <button className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

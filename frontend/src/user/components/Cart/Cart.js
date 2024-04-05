import React, { Fragment, useEffect } from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, clearErrors } from "../../../actions/cartAction";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector(store => store);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      dispatch(getUserCart());
    }
  }, [dispatch, error, isAuthenticated, cart.update, cart.delete]);

  if (!cart || !cart.cart || loading) {
    return <Loader />;
  }

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  }

  return (
    <>
      {cart.cart.cart?.cartItems && cart.cart.cart?.cartItems.length === 0 ? (
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

          {cart.cart.cart?.cartItems &&
            cart.cart.cart?.cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#fff] min-h-[8rem] grid grid-cols-[4fr,2fr,1fr,1fr] box-border border-2 border-t-0 rounded-md"
              >
                <CartItemCard item={item} dispatch={dispatch} />

                <div className="text-lg font-medium py-4">
                  <p>{item.size}</p>
                </div>

                {/* Subtotal */}
                <div className=" py-4 text-lg font-medium">
                  <p>Rs{item.price}</p>
                </div>
              </div>
            ))}

          <div className="flex gap-5 justify-end mt-5">
            <div className=" bg-white w-[20rem] min-h-[5rem] flex flex-col gap-5 justify-around p-4 rounded-md border-2">
              <div className=" flex justify-between">
                <p>Subtotal Total:</p>
                <p>Rs{cart.cart.cart?.totalPrice}</p>
              </div>
              <div className=" flex justify-between">
                <p>Discount:</p>
                <p className=" text-green-400">-Rs{cart.cart.cart?.discount}</p>
              </div>
              <div className=" flex justify-between">
                <p>Grand Total:</p>
                <p>Rs {cart.cart.cart?.totalDiscountedPrice} </p>
              </div>

              <button onClick={handleCheckout} className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md">
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

import React, { Fragment, useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVoucherErrors,
  applyVoucher,
  removeVoucher,
} from "../../../actions/voucherAction";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { getUserCart, clearErrors } from "../../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart, loading, voucher } = useSelector((store) => store);

  const { error: cartError } = useSelector((state) => state.cart);
  const { error: voucherError } = useSelector((state) => state.voucher);
  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(getUserCart());
    }

    if (cartError) {
      toast.error(cartError);
      dispatch(clearErrors());
    }
    if (voucherError) {
      toast.error(voucherError);
      dispatch(clearVoucherErrors());
    }
  }, [
    dispatch,
    isAuthenticated,
    cart.update,
    cart.delete,
    voucher.removed,
    voucher.applied,
    navigate,
    voucherError,
    cartError,
  ]);

  if (!cart || !cart.cart || loading) {
    return <Loader />;
  }

  const handleCheckout = () => {
    const redirectToShipping = "/shipping";

    navigate("/login", {
      state: { redirect: redirectToShipping },
    });
  };

  const handleApplyVoucher = () => {
    dispatch(applyVoucher(voucherCode));
  };

  const handleRemoveVoucher = () => {
    dispatch(removeVoucher(cart.cart.cart?.voucher));
  };

  return (
    <>
      {cart.cart.cart?.cartItems && cart.cart.cart?.cartItems.length === 0 ? (
        <div className=" w-full min-h-[80vh] flex justify-center items-center">
          <div className=" flex flex-col justify-center items-center gap-5">
            <FaCartArrowDown className=" text-[10rem] lg:text-[15rem]" />
            <p className=" text-xl md:text-3xl lg:text-4xl text-center font-medium uppercase ">
              Cart Is Empty. <br />
              <span className=" text-[#eddb8e]">Please Add the Product</span>
            </p>
            <Link to={`/products`}>
              <button className=" bg-[#141414] text-white uppercase border-2 px-5 py-2 text-xl lg:text-3xl hover:bg-[#eddb8e] hover:text-black hover:shadow-lg rounded-md font-medium">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className=" min-h-[60vh] px-[1rem] md:px-[2rem] lg:px-[2rem] xl:px-[8rem] py-[2rem]">
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
                className="bg-[#fff] min-h-[8rem] grid grid-cols-[3fr,2fr,1fr,1fr]  md:grid-cols-[3.5fr,2fr,1fr,1fr] box-border border-2 border-t-0 rounded-md"
              >
                <CartItemCard item={item} dispatch={dispatch} />

                <div className="text-sm md:text-lg font-medium py-4">
                  <p>{item.size}</p>
                </div>

                {/* Subtotal */}
                <div className=" py-4 text-sm md:text-lg font-medium">
                  <p>Rs{item.price}</p>
                </div>
              </div>
            ))}

          <div className="flex gap-5 justify-end mt-5">
            {cart.cart.cart?.voucher ? (
              <div className=" w-[15rem] flex flex-col gap-3 text-sm md:text-base">
                <p className=" uppercase">Voucher: {cart.cart.cart?.voucher}</p>
                <button
                  className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md text-sm md:text-base"
                  onClick={handleRemoveVoucher}
                >
                  Remove Voucher
                </button>
              </div>
            ) : (
              <div className=" w-[10rem] md:w-[15rem] flex flex-col gap-3">
                <input
                  type="text"
                  value={voucherCode}
                  placeholder="Enter Voucher"
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className=" uppercase px-2 py-2 outline-none border-2 rounded-md"
                />
                <button
                  className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md text-sm md:text-base"
                  onClick={handleApplyVoucher}
                  disabled={!voucherCode}
                >
                  Apply Voucher
                </button>
              </div>
            )}
            <div className=" bg-white w-[20rem] min-h-[5rem] flex flex-col gap-5 justify-around p-4 rounded-md border-2">
              <div className=" flex justify-between text-sm md:text-base">
                <p>Subtotal Total:</p>
                <p>Rs{cart.cart.cart?.totalPrice}</p>
              </div>
              <div className=" flex justify-between text-sm md:text-base">
                <p>Discount:</p>
                <p className=" text-green-400">-Rs{cart.cart.cart?.discount}</p>
              </div>
              {cart.cart.cart?.voucherDiscount > 0 && (
                <div className="flex justify-between text-sm md:text-base">
                  <p>Voucher Discount:</p>
                  <p className="text-green-400">
                    -Rs{cart.cart.cart?.voucherDiscount}
                  </p>
                </div>
              )}
              <div className=" flex justify-between text-sm md:text-base">
                <p>Grand Total:</p>
                <p>Rs {cart.cart.cart?.totalDiscountedPrice} </p>
              </div>

              <button
                onClick={handleCheckout}
                className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md text-sm md:text-base"
              >
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

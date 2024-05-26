import React, { useEffect, useState } from "react";
import CheckoutProcess from "./CheckoutProcess";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cart, shippingDetails } = useSelector((state) => ({
    cart: state.cart.cart,
    shippingDetails: state.cart.shippingDetails,
  }));

  const navigate = useNavigate();

  const [DeliveryType, setDeliveryType] = useState("");
  const [shippingCharge, setShippingCharge] = useState(0);

  const handleDeliveryType = (type) => {
    setDeliveryType(type);
    setShippingCharge(type === "pickup" ? 100 : 200);
  };

  const subtotal = cart.cart?.totalDiscountedPrice;

  const OrderTotal = cart.cart?.totalDiscountedPrice + shippingCharge;

  const discount = cart.cart?.discount + (cart.cart?.voucherDiscount || 0);

  const paymentHandler = () => {
    const data = {
      subtotal,
      discount,
      shippingCharge,
      OrderTotal,
    };
    sessionStorage.setItem("orderData", JSON.stringify(data));
    navigate("/payment/process");
  };

  const isEmptyCart =
    !cart?.cart?.cartItems || cart?.cart?.cartItems?.length === 0;
  const isEmptyShippingDetails =
    !shippingDetails.name ||
    !shippingDetails.address ||
    !shippingDetails.city ||
    !shippingDetails.state ||
    !shippingDetails.phoneNo;

  if (isEmptyCart || isEmptyShippingDetails) {
    navigate("/"); // Navigate to home page
    return null;
  }

  return (
    <>
      <CheckoutProcess activeProcess={1} />
      <div className=" px-[1rem] md:px-[2rem] lg:px-[2rem] xl:px-[8rem] py-[1rem] min-h-[60vh">
        <div className=" w-full grid gap-5 bg-white p-4 rounded-md shadow-md border-2">
          {/* shipping Details */}
          <div className=" bg-[#f5f5f5] border-2 rounded-md p-4 text-sm md:text-base">
            <h1 className=" text-lg font-medium pb-2">Shipping Address</h1>
            <div className=" flex gap-3">
              <label>Name:</label>
              <p>{shippingDetails.name}</p>
            </div>
            <div className=" flex gap-2">
              <label>Address:</label>
              <p>
                {shippingDetails.state},{shippingDetails.city},
                {shippingDetails.address}
              </p>
            </div>
            <div className=" flex gap-2">
              <label>Mobile No:</label>
              <p>{shippingDetails.phoneNo}</p>
            </div>
          </div>

          <div className="w-full bg-[#f5f5f5] border-2 rounded-md p-4">
            <h1 className=" text-lg font-medium pb-2">Select Delivery</h1>
            <div className=" flex gap-5">
              <button
                onClick={() => handleDeliveryType("pickup")}
                className={` ${
                  DeliveryType === "pickup"
                    ? " bg-[#eddb8e] text-black"
                    : "bg-[#141414] text-white"
                }  rounded-md font-medium p-2 md:p-4 text-xs md:text-base`}
              >
                PickUp Parcel
                <p>Delivery Charge: Rs 100</p>
              </button>
              <button
                onClick={() => handleDeliveryType("home")}
                className={` ${
                  DeliveryType === "home"
                    ? " bg-[#eddb8e] text-black"
                    : " bg-[#141414]  text-white"
                }   rounded-md font-medium p-2 md:p-4 text-xs md:text-base`}
              >
                Home Delivery
                <p>Delivery Charge: Rs 200</p>
              </button>
            </div>
          </div>

          {/* cartitems */}
          <div className=" w-full bg-[#f5f5f5] border-2 rounded-md p-4 grid lg:grid-flow-col gap-4 lg:gap-0 lg:justify-between">
            <div className=" flex flex-col gap-3">
              <h1 className=" text-lg font-medium pb-2">Order Items</h1>
              {cart.cart?.cartItems &&
                cart.cart?.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className=" w-full lg:w-[35rem] flex justify-between items-center bg-white border-2 rounded-md p-2"
                  >
                    <div className=" w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem]">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-full h-full object-scale-down"
                      />
                    </div>
                    <Link
                      to={`/product/${item.product._id}`}
                      className=" text-xs md:text-base"
                    >
                      {item.product.name}
                    </Link>
                    <p className=" text-xs md:text-base">
                      {item.quantity} X Rs{item.product.price} =
                      <span> Rs{item.price}</span>
                    </p>
                  </div>
                ))}
            </div>

            {/* order totals */}
            <div className=" w-full">
              <h1 className=" text-lg font-medium pb-2">Order Summery</h1>
              <div className=" bg-white w-full lg:w-[20rem] min-h-[5rem] flex flex-col gap-5 justify-around p-4 rounded-md border-2">
                <div className=" flex justify-between">
                  <p>Sub Total:</p>
                  <p>Rs{cart.cart?.totalPrice}</p>
                </div>
                <div className=" flex justify-between">
                  <p>Discount:</p>
                  <p className=" text-green-400">-Rs{cart.cart?.discount}</p>
                </div>
                {cart.cart?.voucherDiscount !== 0 && (
                  <div className="flex justify-between">
                    <p>Voucher Discount:</p>
                    <p className="text-green-400">
                      -Rs{cart.cart?.voucherDiscount}
                    </p>
                  </div>
                )}
                {shippingCharge !== 0 && (
                  <div className="flex justify-between">
                    <p>Delivery Charge:</p>
                    <p className=" text-red-300">Rs {shippingCharge}</p>
                  </div>
                )}

                <div className=" flex justify-between">
                  <p>Grand Total:</p>
                  <p>Rs {OrderTotal} </p>
                </div>
                <button
                  onClick={paymentHandler}
                  disabled={shippingCharge === 0}
                  className=" bg-[#141414] text-white py-2 hover:bg-[#eddb8e] hover:text-black font-medium rounded-md"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetail,
  updateOrder,
} from "../../../actions/orderAction";
import { toast } from "react-toastify";
import Loader from "../../../user/components/Loader/Loader";
import { ADMIN_UPDATE_ORDER_RESET } from "../../../constants/orderConstants";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const { loading, error, order } = useSelector((state) => state.orderDetail);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Status Updated");
      dispatch({ type: ADMIN_UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetail(id));
  }, [dispatch, id, error, updateError, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" py-3 flex flex-col gap-4">
          <div className=" w-full flex gap-3">
            {/* shipping Details */}
            <div className=" w-[70%] bg-white border-2 rounded-md p-4">
              <div className="bg-[#f5f5f5] border-2 rounded-md p-2">
                <h1 className=" text-lg font-medium">Shipping Address</h1>
                <div className=" flex gap-3">
                  <label>Name:</label>
                  <p>{order.shippingDetails && order.shippingDetails.name}</p>
                </div>
                <div className=" flex gap-2">
                  <label>Address:</label>
                  <p>
                    {order.shippingDetails &&
                      `${order.shippingDetails.state},
                  ${order.shippingDetails.city}, ${order.shippingDetails.address}`}
                  </p>
                </div>
                <div className=" flex gap-2">
                  <label>Mobile No:</label>
                  <p>
                    {order.shippingDetails && order.shippingDetails.phoneNo}
                  </p>
                </div>
              </div>
            </div>

            <div className=" w-[30%] bg-white border-2 rounded-md p-4">
              <h1 className="text-lg font-medium">Payment Information</h1>
              <div className=" flex items-center gap-3 pb-1">
                <p>Status:</p>
                <span>{order.paymentInfo && order.paymentInfo.status}</span>
              </div>
              <div className=" flex gap-2 bg-[#f5f5f5] rounded-md p-2 border-2">
                <p>Payment Total:</p>
                <span>Rs {order.totalOrderPrice}</span>
              </div>
            </div>
          </div>

          {/* orderItems */}
          <div className=" bg-white p-4 border-2 rounded-md flex flex-col gap-2">
            <h1 className=" text-lg font-medium">Order Items</h1>
            {order.orderItems &&
              order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className=" flex justify-between items-center bg-[#f5f5f5] border-2 rounded-md p-2"
                >
                  <div className=" w-[5rem] h-[5rem]">
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                  <div className=" flex flex-col items-center">
                    <Link to={`/product/${item.product._id}`}>
                      Name: {item.product.name}
                    </Link>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>
                    {item.quantity} X Rs{item.product.price} =
                    <span> Rs{item.price}</span>
                  </p>
                </div>
              ))}
            <div className=" bg-[#f5f5f5] border-2 rounded-md p-2">
              <h1 className=" text-lg font-medium pb-2">Order Status</h1>
              <div
                className={`${
                  order.orderStatus === "Processing"
                    ? "bg-red-500"
                    : order.orderStatus === "Confirmed"
                    ? " bg-blue-500"
                    : order.orderStatus === "Shipped"
                    ? "bg-orange-500"
                    : order.orderStatus === "Delivered"
                    ? "bg-green-500"
                    : ""
                } text-white w-[7rem] rounded-md flex items-center`}
              >
                <p className="text-center px-3 py-1">{order.orderStatus}</p>
              </div>
            </div>
          </div>

          <div
            className={`${
              order.orderStatus === "Delivered" ? " hidden " : ""
            } w-full bg-white p-4 rounded-md border-2`}
          >
            <h1 className=" text-lg font-medium pb-2">Update Status</h1>
            <form
              className=" flex flex-col gap-2"
              encType="multipart/form-data"
              onSubmit={updateOrderHandler}
            >
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <select
                  value={status}
                  className=" p-1 border-2 outline-none"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Choose Status</option>
                  {order.orderStatus === "Processing" && (
                    <option value="Confirmed">Confirmed</option>
                  )}
                  {order.orderStatus === "Confirmed" && (
                    <option value="Shipped">Shipped</option>
                  )}
                  {order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>
              </div>

              <div>
                <input
                  className=" cursor-pointer w-full mt-2 py-1.5 bg-[#141414] text-white rounded-md font-medium hover:bg-[#eddb8e] hover:text-black"
                  type="submit"
                  value="Update Order"
                  disabled={status === "" ? true : false}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrder;

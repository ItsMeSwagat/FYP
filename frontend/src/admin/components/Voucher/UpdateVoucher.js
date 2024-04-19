import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import Loader from "../../../user/components/Loader/Loader";
import {
  clearVoucherErrors,
  getVoucherDetails,
  updateVoucher,
} from "../../../actions/voucherAction";
import { UPDATE_VOUCHER_RESET } from "../../../constants/voucherConstants";

const UpdateVoucher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const voucherId = id;

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.adminVoucher);
  const {
    loading: detailsLoading,
    error,
    voucher,
  } = useSelector((state) => state.voucherDetails);

  const [voucherName, setVoucherName] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherDiscountType, setVoucherDiscountType] = useState("");
  const [voucherExpiry, setVoucherExpiry] = useState("");

  const discountType = ["fixed", "percentage"];

  useEffect(() => {
    if (voucher && voucher._id !== voucherId) {
      dispatch(getVoucherDetails(voucherId));
    } else {
      setVoucherName(voucher.name);
      setVoucherDiscount(voucher.discount);
      setVoucherDiscountType(voucher.discountType);
      setVoucherExpiry(voucher.expiry);
    }

    if (error) {
      toast.error(error);
      dispatch(clearVoucherErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearVoucherErrors());
    }

    if (isUpdated) {
      toast.success("Voucher Update Successful");
      navigate("/admin/allVouchers");
      dispatch({ type: UPDATE_VOUCHER_RESET });
    }
  }, [error, dispatch, navigate, isUpdated, voucher, voucherId, updateError]);

  const updateVoucherHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", voucherName);
    myForm.set("discount", voucherDiscount);
    myForm.set("discountType", voucherDiscountType);
    myForm.set("expiry", voucherExpiry);

    dispatch(updateVoucher(voucherId, myForm));
  };


  return (
    <>
      <div className=" my-3">
        <div className=" flex flex-col gap-2 bg-white rounded-md border-2 p-4">
          <h1 className=" text-3xl text-center font-bold">UPDATE VOUCHER</h1>
          <form
            className=" flex flex-col gap-2"
            encType="multipart/form-data"
            onSubmit={updateVoucherHandler}
          >
            <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
              <label className=" text-lg font-medium">Voucher Name</label>
              <input
                className=" p-1 border-2 outline-none"
                type="text"
                placeholder="Enter Voucher Name"
                required
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value.toUpperCase())}
              />
            </div>
            

            <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
              <label className=" text-lg font-medium">Voucher Discount</label>
              <input
                className=" p-1 border-2 outline-none"
                type="number"
                placeholder="Enter Voucher Discount"
                required
                value={voucherDiscount}
                onChange={(e) => setVoucherDiscount(e.target.value)}
              />
            </div>

            <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
              <select
                value={voucherDiscountType}
                className=" p-1 border-2 outline-none"
                required
                onChange={(e) => setVoucherDiscountType(e.target.value)}
              >
                <option value="">Choose Discount Type</option>
                {discountType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
              <label className=" text-lg font-medium">
                Voucher Expiry Date
              </label>
              <input
                className=" p-1 border-2 outline-none"
                type="date"
                placeholder="Enter Expiry Date"
                required
                value={voucherExpiry}
                onChange={(e) => setVoucherExpiry(e.target.value)}
              />
            </div>

            <div>
              <input
                className=" cursor-pointer w-full mt-2 py-1.5 bg-[#141414] text-white rounded-md font-medium"
                type="submit"
                value="Update Voucher"
                disabled={loading ? true : false}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateVoucher;

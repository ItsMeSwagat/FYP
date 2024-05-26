import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { clearErrors, updatePassword } from "../../../actions/profileAction";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Update Successful");
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" min-h-[60vh] px-[1rem] md:px-[2rem] xl:px-[8rem] py-[2rem] flex justify-center items-center">
          <ToastContainer />
          <form
            encType="multipart/form-data"
            onSubmit={changePasswordSubmit}
            className=" w-[30rem] h-[25rem] flex flex-col justify-around items-center bg-white rounded-md p-4 border-2"
          >
            <div className=" w-full pb-2">
              <h1 className=" text-2xl lg:text-3xl font-bold pb-2">
                CHANGE PASSWORD
              </h1>
              <p className=" font-semibold pb-1">Old Password</p>
              <input
                type="password"
                name="old password"
                id="old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter Old Password"
                className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
              />
            </div>

            <div className=" w-full pb-2">
              <p className=" font-semibold pb-1">New Password</p>
              <input
                type="password"
                name="new password"
                id="new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
              />
            </div>

            <div className=" w-full pb-2">
              <p className=" font-semibold pb-1">Confirm Password</p>
              <input
                type="password"
                name="confirm password"
                id="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Confirm Password"
                className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
              />
            </div>

            <input
              type="submit"
              value="Update"
              className=" w-full  bg-[#141414] text-white font-semibold text-xl py-1.5 rounded-[10px] hover:bg-[#eddb8e] hover:text-black"
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ChangePassword;

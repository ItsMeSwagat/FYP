import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { clearErrors, resetPassword } from "../../../actions/profileAction";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resettoken } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(resettoken, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Reset Successful");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" min-h-screen px-[8rem] py-[2rem] flex justify-center items-center">
          <ToastContainer />
          <form
            encType="multipart/form-data"
            onSubmit={resetPasswordSubmit}
            className="w-[30rem] h-[20rem] flex flex-col justify-around items-center bg-white rounded-md p-4 border-2 shadow-lg"
          >
            <h1 className=" text-3xl font-semibold pb-2">
              Reset <span className=" text-[#eddb8e]">Password</span>
            </h1>
            <div className=" w-full pb-2">
              <p className=" font-semibold pb-1">New Password</p>
              <input
                type="password"
                name="new password"
                id="new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter New Password"
                className=" w-full h-11 rounded-[6px] border-2 bg-[#f5f5f5] pl-2 outline-none"
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
                className=" w-full h-11 rounded-[6px] bg-[#f5f5f5] border-2 pl-2 outline-none"
              />
            </div>

            <input
              type="submit"
              value="Reset Now"
              className=" w-full  bg-[#141414] text-white font-semibold text-xl py-1.5 rounded-[10px] hover:bg-[#eddb8e] hover:text-black"
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;

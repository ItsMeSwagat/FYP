import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { clearErrors, forgotPassword } from "../../../actions/profileAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" min-h-screen px-[8rem] py-[2rem] flex justify-center items-center">
          <ToastContainer />

          <form
            onSubmit={forgotPasswordSubmit}
            className=" w-[30rem] h-[15rem] flex flex-col justify-around items-center bg-white rounded-md p-4 border-2 shadow-lg"
          >
            <h1 className=" text-3xl font-semibold">
              Forgot <span className=" text-[#eddb8e]">Password</span>
            </h1>
            {/* email */}
            <div className=" w-full pb-2">
              <p className=" font-semibold pb-1">Email Address</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className=" w-full h-11 rounded-[5px] border-2 bg-[#f5f5f5]  pl-2 outline-none"
              />
            </div>

            <input
              type="submit"
              value="Send Verification Mail"
              className=" w-full  bg-[#141414] text-white font-medium text-xl py-1.5 rounded-[10px] hover:bg-[#eddb8e] hover:text-black cursor-pointer"
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;

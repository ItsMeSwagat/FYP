import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, login } from "../../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      
    } else if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className=" fixed w-full h-screen top-0 left-0 flex justify-center items-center backdrop-blur-md">
            <div className=" relative w-[25rem] h-[32rem] flex flex-col bg-[#Eddb8D] rounded-[10px] px-[1rem] py-[2rem] border-2 border-[#141414] shadow-2xl ">
              <h1 className=" text-3xl font-bold">WELCOME BACK</h1>
              <h2 className="text-3xl font-bold">LOGIN</h2>
              <p className=" font-medium pb-4 text-sm">
                Don't have an account ?{" "}
                <Link to={`/signup`} className=" font-semibold underline ">
                  Sign Up
                </Link>
              </p>
              <form onSubmit={loginSubmit} className=" flex flex-col pb-6">
                {/* email */}
                <div className=" pb-2">
                  <p className=" font-semibold pb-1">Email Address</p>
                  <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
                  />
                </div>
                {/* password */}
                <div className=" pb-2">
                  <p className=" font-semibold pb-1">Password</p>
                  <input
                    type="password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter Password"
                    className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
                  />
                </div>
                <Link className=" font-medium pb-2">Forget Password?</Link>
                <input
                  type="submit"
                  value="Login"
                  className=" bg-[#141414] text-white font-semibold text-xl py-1.5 rounded-[10px] hover:bg-white hover:text-black"
                />
              </form>
              <div className="flex items-center justify-center space-x-4 pb-4">
                <div className="w-[30%] border-b border-black "></div>
                {/* The line */}
                <span className=" font-semibold "> Or login with</span>
                {/* The text */}
                <div className="w-[30%] border-b border-black "></div>
                {/* The line */}
              </div>

              {/* social login */}
              <div className=" flex gap-4">
                <button className=" w-[50%] h-10 flex justify-center items-center gap-2 bg-white rounded-[10px] border-2 border-[#DB4437] text-[#DB4437] font-semibold hover:bg-[#DB4437] hover:text-white">
                  <FcGoogle size={20} />
                  Google
                </button>
                <button className=" w-[50%] h-10 flex justify-center items-center gap-2 bg-white rounded-[10px] border-2 border-[#316FF6] text-[#316FF6] font-semibold hover:bg-[#316FF6] hover:text-white">
                  <FaFacebookSquare size={20} />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Login;

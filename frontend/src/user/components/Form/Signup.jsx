import React, { Fragment, useEffect, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, register } from "../../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profileimg.png");

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent backdrop-blur-md">
            <div className=" relative w-[25rem] h-[40rem] flex flex-col bg-[#Eddb8D] rounded-[10px] px-[1rem] py-[1rem] border-2 border-[#141414] shadow-2xl ">
              
              <h1 className=" text-3xl font-bold">HELLO,</h1>
              <h2 className="text-3xl font-bold">SIGN UP</h2>
              <p className=" font-medium pb-4 text-sm">
                Already have an account ?{" "}
                <Link to={`/login`} className=" font-semibold underline ">
                  Login now
                </Link>
              </p>
              <form
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                className=" flex flex-col pb-6"
              >
                {/* Name */}
                <div className=" pb-2">
                  <p className=" font-semibold pb-1">Name</p>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    placeholder="Enter your Name"
                    className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
                  />
                </div>
                {/* email */}
                <div className=" pb-2">
                  <p className=" font-semibold pb-1">Email Address</p>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
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
                    value={password}
                    onChange={registerDataChange}
                    placeholder="Enter Password"
                    className=" w-full h-11 rounded-[10px] border-2 border-[#141414] pl-2 outline-none"
                  />
                </div>
                <div className=" flex items-center gap-4 py-2">
                  <div className=" w-[3.5rem] h-[3rem] rounded-full overflow-hidden">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className=" w-full h-full object-cover object-top rounded-full"
                    />
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className=" file:w-full file:h-[2.5rem] rounded-[10px] file:bg-[#141414] file:text-white file:border-none file:cursor-pointer"
                  />
                </div>
                <Link className=" font-medium pb-2">Forget Password?</Link>
                <input
                  type="submit"
                  value="Register"
                  className=" bg-[#141414] text-white font-semibold text-xl py-1.5 rounded-[10px] hover:bg-white hover:text-black"
                />
              </form>
              <div className="flex items-center justify-center space-x-3 pb-4">
                <div className="w-[30%] border-b border-black "></div>
                {/* The line */}
                <span className=" font-semibold "> Or Signup with</span>
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

export default Signup;

import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Account = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login")
      }
    }
  }, [isAuthenticated, navigate, user, loading]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-[8rem] w-full min-h-[60vh] flex flex-col justify-center items-center">
          {/* Manage Account */}
          <div className=" flex gap-4 w-full py-4">
            <div className=" relative w-full h-[10rem] flex items-center justify-between bg-white rounded-md p-4 border-2">
              <h1 className=" text-xl font-medium">Personal Profile</h1>
              <div className=" w-[8rem] h-[8rem] rounded-full overflow-hidden">
                <img
                  src={user.avatar.url}
                  alt="img"
                  className=" object-cover object-center"
                />
              </div>
              <div className=" flex flex-col gap-2 text-lg">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p className=" font-medium">
                  Joined At:{" "}
                  <span className=" font-normal">
                    {String(user.createdAt).substr(0, 10)}
                  </span>
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <Link
                  to={`/customer/update`}
                  className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black"
                >
                  Edit Profile
                </Link>
                <Link
                  to={`/password/update`}
                  className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black"
                >
                  Change Password
                </Link>
              </div>
            </div>
            {/* <div className=" flex flex-col justify-between w-[65%] h-[10rem] bg-white rounded-md border-2 p-4">
                  <h1 className=" text-xl font-medium">Private Profile</h1>
                  <div className=" flex flex-col gap-2">
                    <Link className="bg-[#141414] w-[8rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black">
                      Edit Profile
                    </Link>
                    <Link className="bg-[#141414] w-[12rem] px-5 py-2 font-medium hover:bg-[#eddb8e] text-white hover:text-black">
                      Change Password
                    </Link>
                  </div>
                </div> */}
          </div>

          {/* Recent Orders */}
          <div className=" w-full min-h-[15rem] bg-white rounded-md border-2 p-4 mb-4">
            <h1 className=" text-xl font-medium">Recent Orders</h1>
            <div></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Account;

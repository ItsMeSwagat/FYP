import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from "../../../constants/productConstants";
import {
  adminGetUserDetails,
  adminUpdateUser,
  clearErrors,
} from "../../../actions/userAction";
import Loader from "../../../user/components/Loader/Loader";

const UpdateUserRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = id;
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateRoleLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (user && user._id !== userId) {
      dispatch(adminGetUserDetails(userId));
    } else {
      setUserName(user.name);
      setUserEmail(user.email);
      setUserRole(user.price);
    }

    if (isUpdated) {
      toast.success("User Update Successful");
      navigate("/admin/users");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [error, dispatch, navigate, isUpdated, updateError, user, userId]);

  const userRoleUpdateSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", userName);
    myForm.set("email", userEmail);
    myForm.set("role", userRole);

    dispatch(adminUpdateUser(userId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" my-[5rem] px-[8rem]">
          <div className=" flex flex-col gap-3 bg-white rounded-md border-2 p-4">
            <h1 className=" text-3xl text-center font-bold">
              UPDATE USER ROLE
            </h1>
            <form
              className=" flex flex-col gap-5"
              onSubmit={userRoleUpdateSubmitHandler}
            >
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">Product Name</label>
                <input
                  className=" p-1 border-2 outline-none"
                  type="text"
                  placeholder="Enter Name"
                  disabled
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <label className=" text-lg font-medium">Product Name</label>
                <input
                  className=" p-1 border-2 outline-none"
                  type="text"
                  placeholder="Enter Email"
                  disabled
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className=" bg-[#f5f5f5] flex flex-col gap-1 p-2 rounded-md border-2 ">
                <select
                  value={userRole}
                  className=" p-1 border-2 outline-none"
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  {user.role === "user" && <option value="admin">Admin</option>}
                  {user.role === "admin" && <option value="user">User</option>}
                </select>
              </div>

              <div>
                <input
                  className=" cursor-pointer w-full mt-2 py-1.5 bg-[#141414] text-white rounded-md font-medium"
                  type="submit"
                  value="Update Role"
                  disabled={
                    updateRoleLoading
                      ? true
                      : false || userRole === ""
                      ? true
                      : false
                  }
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserRole;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile, clearErrors } from "../../../actions/profileAction";
import { loadUser } from "../../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import Loader from "../Loader/Loader";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profileimg.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Update Successful");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className=" min-h-[60vh] px-[8rem] py-[2rem] flex justify-center items-center">
          <form
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
            className=" w-[30rem] h-[25rem] flex flex-col justify-around items-center bg-white rounded-md p-4 border-2"
          >
            {/* Name */}
            <div className=" w-full pb-2">
              <p className=" font-semibold pb-1">Name</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className=" bg-[#f6f6f6] w-full h-11 rounded-[5px] pl-2 border-2 outline-none"
              />
            </div>
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

            <div className=" w-full flex items-center gap-4 py-2">
              <div className=" w-[3rem] h-[3rem] rounded-full overflow-hidden">
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
                onChange={updateProfileDataChange}
                className=" file:w-full file:h-[2.5rem] rounded-[10px] file:bg-[#141414] file:text-white file:border-none file:cursor-pointer hover:file:bg-[#eddb8e] hover:file:text-black"
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

export default EditProfile;

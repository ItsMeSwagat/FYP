import React from "react";
import { AiFillProfile } from "react-icons/ai";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../../actions/userAction";

const ProfileDropdown = ({ setOpenProfile }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(Logout());
    navigate("/login");
  }

  const handleCloseDropdown = () => {
    setOpenProfile(false);
  };
  return (
    <div className=" fixed bg-white z-10 right-[2.5rem] top-[7.5rem] md:right-[3.5rem]  lg:right-[3.5rem]  xl:right-[9.5rem] w-[12rem] flex flex-col pl-3 py-2 rounded-md border-2 dropdownProfile">
      <ul className=" flex flex-col gap-5 text-[0.9]">
        <Link to={`/account`}>
          <li
            onClick={handleCloseDropdown}
            className=" flex items-center gap-2 hover:text-[#eddb8e] cursor-pointer"
          >
            <div className=" w-[2rem] h-[2rem] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={user.avatar.url}
                alt="profileimg"
                className=" w-full h-full object-cover object-top rounded-full"
              />
            </div>
            Manage your Account
          </li>
        </Link>
        <Link to={`/orders/user`}>
          <li
            onClick={handleCloseDropdown}
            className=" flex items-center gap-2 hover:text-[#eddb8e] cursor-pointer"
          >
            <BiSolidShoppingBagAlt size={20} /> My Orders
          </li>
        </Link>
        <Link onClick={logout}>
          <li
            onClick={handleCloseDropdown}
            className=" flex items-center gap-2 hover:text-[#eddb8e] cursor-pointer"
          >
            <IoLogOut size={25} />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default ProfileDropdown;

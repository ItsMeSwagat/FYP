import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

export const SideNavbar = () => {
  const { user } = useSelector((state) => state.user);

  const [dropdowns, setDropdowns] = useState({});
  const [activeItem, setActiveItem] = useState(0);

  const toggleDropdown = (index) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [index]: !prevDropdowns[index],
    }));
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div className=" bg-white w-[20rem] max-w-[20rem] border-r-2 h-screen overflow-hidden md:relative fixed shadow-md">
      <div className=" bg-[#f5f5f5] flex gap-3 items-center p-2 m-3 rounded-md border-2">
        <div className=" w-[3rem] rounded-full overflow-hidden">
          <img
            src="/jass.jpg"
            alt="JASS SAREES"
            className=" w-full h-full object-cover"
          />
        </div>
        <p className=" text-2xl font-bold">
          Jass <span className=" text-[#eddb8e]">Sarees</span>
        </p>
      </div>

      <div className=" mt-[2rem]">
        <ul className=" flex flex-col gap-3 m-3">
          {SidebarData.map((item, index) => (
            <li
              className={` bg-[#f5f5f5] rounded-md border-2 p-2`}
              key={index}
              onClick={() => handleItemClick(index)}
            >
              {item.subNav ? (
                <span
                  className={` ${
                    activeItem === index ? " text-[#eddb8e]" : ""
                  } flex items-center justify-between font-medium text-lg`}
                  onClick={() => toggleDropdown(index)}
                >
                  {item.icon}
                  {item.title}
                  {dropdowns[index] ? item.iconOpened : item.iconClosed}
                </span>
              ) : (
                <Link
                  className={` ${
                    activeItem === index ? " text-[#eddb8e]" : ""
                  } flex items-center justify-between font-medium text-lg hover:text-[#eddb8e]`}
                  to={item.path}
                >
                  {item.icon}
                  {item.title}
                  <div></div>
                </Link>
              )}

              {item.subNav && dropdowns[index] && (
                <ul className=" m-4">
                  {item.subNav.map((subItem, subIndex) => (
                    <li className="" key={subIndex}>
                      <Link
                        className=" flex items-center text-[1rem] gap-3 "
                        to={subItem.path}
                      >
                        {subItem.icon}
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

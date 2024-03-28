import React from "react";
import { FaFacebook, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" relative">
      {/* footer section */}
      <div className=" bg-[#141414] text-white w-full h-[25rem] flex justify-between items-center lg:px-[4rem]  xl:px-[8rem]">
        <div className=" w-[30%] flex flex-col gap-3">
          <h1 className=" lg:text-4xl xl:text-5xl font-bold">
            JASs <span className=" text-[#EDDB8D]">Sarees</span>
          </h1>
          <p className=" pb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            in justo elementum, scelerisque justo lobortis, accumsan nibh.
          </p>
          {/* icons */}
          <div className=" flex gap-5 text-[1.5rem] text-[#EDDB8D]">
            <FaFacebook />
            <FaInstagram />
            <FaFacebookMessenger />
          </div>
        </div>

        <div className=" flex gap-[5rem]">
          <div className=" flex flex-col gap-5 text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-lg">CUSTOMER SERVICE</h1>
            <Link>Track Your Order</Link>
            <Link>Shipping & Returns</Link>
            <Link>Terms & Services</Link>
            <Link>Privacy Policy</Link>
          </div>
          <div className=" flex flex-col gap-5 text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-lg">SAREES TYPES</h1>
            <Link>Paithani</Link>
            <Link>Banarasi</Link>
            <Link>Organza</Link>
            <Link>Chanderi</Link>
            <Link>Sambalpuri</Link>
          </div>
          <div className=" flex flex-col gap-5 text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-lg">ABOUT US</h1>
            <Link>Our Producers</Link>
            <Link>Sitemap</Link>
            <Link>FAQ</Link>
            <Link>About Us</Link>
          </div>
        </div>
      </div>
      {/* copyright section */}
      <div className=" bg-[#EDDB8D] w-full h-[2.5rem] flex justify-center items-center">
        <p className=" font-medium text-base">
          &copy; {new Date().getFullYear()} Jass Sarees. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

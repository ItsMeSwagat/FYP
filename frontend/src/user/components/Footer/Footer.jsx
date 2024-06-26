import React from "react";
import { FaFacebook, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" relative">
      {/* footer section */}
      <div className=" bg-[#141414] text-white w-full h-[35rem] md:h-[20rem] lg:h-[25rem] flex flex-col-reverse md:flex-row justify-evenly md:justify-between items-center px-[2rem] md:px-[4rem]  xl:px-[8rem]">
        <div className=" md:w-[30%] flex flex-col gap-3">
          <h1 className=" text-3xl lg:text-4xl xl:text-5xl font-bold">
            JASs <span className=" text-[#EDDB8D]">Sarees</span>
          </h1>
          <p className=" text-xs lg:text-sm pb-5">
            Welcome to our premium handwork saree store where elegance meets
            tradition. Discover a mesmerizing collection of intricately crafted
            sarees , each a masterpiece of artistry and skill from delicate hand
            embroidery to exquisite beadwork and timeless motifs where each
            saree gives premium & luxury feels.
          </p>
          {/* icons */}
          <div className=" flex gap-5 text-[1rem] md:text-[1.5rem] text-[#EDDB8D]">
            <Link to={`https://www.facebook.com/creation.jass`}>
              <FaFacebook />
            </Link>
            <Link to={`https://www.instagram.com/jass_sarees/`}>
              <FaInstagram />
            </Link>
            <Link>
              <FaFacebookMessenger />
            </Link>
          </div>
        </div>

        <div className=" flex gap-[2rem] md:gap-[3rem] xl:gap-[5rem]">
          <div className=" flex flex-col gap-5 text-xs xl:text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-sm xl:text-lg">
              CUSTOMER SERVICE
            </h1>
            <Link to={`https://www.aramex.com/ae/en/track/shipments`}>
              Track Your Order
            </Link>
            <Link to={`/termsservices`}>Terms & Services</Link>
            <Link to={`/privacypolicy`}>Privacy Policy</Link>
          </div>
          <div className=" flex flex-col gap-5 text-xs xl:text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-sm xl:text-lg">
              SAREES TYPES
            </h1>
            <Link>Paithani</Link>
            <Link>Banarasi</Link>
            <Link>Organza</Link>
            <Link>Chanderi</Link>
            <Link>Sambalpuri</Link>
          </div>
          <div className=" flex flex-col gap-5 text-xs xl:text-sm">
            <h1 className="  text-[#EDDB8D] font-medium text-sm xl:text-lg">
              ABOUT US
            </h1>
            <Link to={`/faq`}>FAQ</Link>
            <Link to={`/aboutus`}>About Us</Link>
          </div>
        </div>
      </div>
      {/* copyright section */}
      <div className=" bg-[#EDDB8D] w-full h-[2rem] md:h-[2.5rem] flex justify-center items-center">
        <p className=" font-medium text-xs md:text-base">
          &copy; {new Date().getFullYear()} Jass Sarees. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

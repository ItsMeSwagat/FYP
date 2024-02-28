import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainBannerData } from "../../../data/mainBannerData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainBanner = () => {
  return (
    <Swiper
      style={{height: "100%", width: "100%"}}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay
      navigation
      
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
    >
      {MainBannerData.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index}>
          <img src={slideContent.image} alt="" className=" w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainBanner;

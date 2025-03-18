import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slide_1 from "../../assets/frontend_assets/pds.jpg";
import slide_2 from "../../assets/frontend_assets/slide1.jpg";
import slide_3 from "../../assets/frontend_assets/slide2.jpg";
import slide_4 from "../../assets/frontend_assets/slide3.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Header.css";
import { useTranslation } from "react-i18next";

const slides = [
  {
    image: slide_1,
    title: "slide1_title",
    description: "slide1_text",
  },
  {
    image: slide_4,
    title: "slide2_title",
    description: "slide2_text",
  },
  {
    image: slide_3,
    title: "slide3_title",
    description: "slide3_text",
  },
  {
    image: slide_2,
    title: "slide4_title",
    description: "slide4_text",
  },
];

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <div className="header">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="swiper-container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="header-content">
                <h2>{t(slide.title)}</h2>
                <p>{t(slide.description)}</p>
                <a href="#AboutUs" className="header-button">
                  {t("learn_more")}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;

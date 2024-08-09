// Slider.jsx
import React from "react";
import Slider from "react-slick";
import Slide1 from "./slide1";

function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
  };

  return (
    <Slider {...settings}>
      <Slide1 />
    </Slider>
  );
}

export default SliderComponent;

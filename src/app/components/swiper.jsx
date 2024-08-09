"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Slideコンポーネントをインポート
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";
import Slide3 from "@/management/pets/page";

export const SwiperTab = () => {
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const tabChange = (event, newValue) => {
    setValue(newValue);
    if (swiper) {
      swiper.slideTo(newValue);
    }
  };

  return (
    <>
      <Swiper onSwiper={setSwiper} spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <Slide1 />
        </SwiperSlide>
        <SwiperSlide>
          <Slide2 />
        </SwiperSlide>
        <SwiperSlide>
          <Slide3 />
        </SwiperSlide>
      </Swiper>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={tabChange} centered>
          <Tab label="Item One" value={0} />
          <Tab label="Item Two" value={1} />
          <Tab label="Item Three" value={2} />
        </Tabs>
      </Box>
    </>
  );
};

"use client"; // Next.jsのClient Side Rendering (CSR)を使用するための設定

import React, { useState, useEffect } from "react"; // ReactライブラリからuseStateとuseEffectフックをインポート
import { Swiper, SwiperSlide } from "swiper/react"; // Swiperのコンポーネントとスライドをインポート
import "swiper/css"; // SwiperのCSSをインポート
import Box from "@mui/material/Box"; // MUI（Material-UI）からBoxコンポーネントをインポート
import Tabs from "@mui/material/Tabs"; // MUIからTabsコンポーネントをインポート
import Tab from "@mui/material/Tab"; // MUIからTabコンポーネントをインポート

// カスタムスライドコンポーネントをインポート
import Slide1 from "@/components/slides/slide1";
import Slide2 from "@/components/slides/slide2";
import Slide3 from "@/components/slides/slide3";
import Slide4 from "@/components/slides/slide4";

// SwiperTabコンポーネントの定義
export const SwiperTab = () => {
  const [value, setValue] = useState(0); // タブの選択状態を管理するためのstate
  const [swiper, setSwiper] = useState(null); // Swiperインスタンスを管理するためのstate
  const [mounted, setMounted] = useState(false); // コンポーネントがマウントされたかどうかを管理するためのstate

  // コンポーネントのマウント後に実行される副作用
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true); // 100ms後にmountedをtrueに設定
    }, 100); // 100msの遅延を設定

    return () => clearTimeout(timer); // クリーンアップ関数でタイマーをクリア
  }, []);

  // swiperとvalueの変更を監視して実行される副作用
  useEffect(() => {
    if (swiper && typeof swiper.slideTo === "function") {
      swiper.slideTo(value); // タブの選択に応じてスライドを移動
    }
  }, [swiper, value]);

  // タブが変更されたときに呼び出される関数
  const tabChange = (event, newValue) => {
    setValue(newValue); // 新しいタブのインデックスをstateに設定
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={tabChange} centered>
          <Tab label="あなたの家族" value={0} /> {/* タブ1 */}
          <Tab label="カレンダー" value={1} /> {/* タブ2 */}
          <Tab label="今日の出来事" value={3} /> {/* タブ3 */}
          <Tab label="ペット管理" value={2} /> {/* タブ4 */}
        </Tabs>
      </Box>

      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setValue(swiper.activeIndex)}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          {value === 0 && <Slide1 />} {/* タブ1が選択されている場合 */}
        </SwiperSlide>
        <SwiperSlide>
          {value === 1 && <Slide2 />} {/* タブ2が選択されている場合 */}
        </SwiperSlide>
        <SwiperSlide>
          {value === 2 && <Slide3 />} {/* タブ3が選択されている場合 */}
        </SwiperSlide>
        <SwiperSlide>
          {value === 3 && <Slide4 />} {/* タブ3が選択されている場合 */}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

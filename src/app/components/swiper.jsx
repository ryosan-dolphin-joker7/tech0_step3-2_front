"use client"; // Next.jsのClient Side Rendering (CSR)を使用するための設定

import React, { useState, useEffect, useCallback } from "react"; // Reactライブラリからフックをインポート
import { Swiper, SwiperSlide } from "swiper/react"; // Swiperのコンポーネントとスライドをインポート
import "swiper/css"; // SwiperのCSSをインポート
import Box from "@mui/material/Box"; // MUI（Material-UI）からBoxコンポーネントをインポート
import Tabs from "@mui/material/Tabs"; // MUIからTabsコンポーネントをインポート
import Tab from "@mui/material/Tab"; // MUIからTabコンポーネントをインポート

// カスタムスライドコンポーネントをインポート
import Slide_Mydogs from "@/components/slides/slide_mydogs";
import Slide_Calendar from "@/components/slides/slide_calendar";
import Slide_Posts from "@/components/slides/slide_posts";
import Slide_Pets from "@/components/slides/slide_pets";

// SwiperTabコンポーネントの定義
export const SwiperTab = () => {
  // タブの選択状態を管理するためのstate
  const [value, setValue] = useState(0);

  // Swiperインスタンスを管理するためのstate
  const [swiper, setSwiper] = useState(null);

  // タブが変更されたときに呼び出される関数
  const tabChange = useCallback(
    (event, newValue) => {
      setValue(newValue); // 新しいタブのインデックスをstateに設定
      if (swiper) {
        swiper.slideTo(newValue); // Swiperのスライドを移動
      }
    },
    [swiper]
  );

  // スライドが変更されたときにタブの状態を更新する関数
  const handleSlideChange = useCallback((swiper) => {
    setValue(swiper.activeIndex); // Swiperのアクティブスライドに応じてタブの状態を更新
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%", // タブがコンテナ全体に広がるように設定
        }}
      >
        <Tabs
          value={value}
          onChange={tabChange}
          centered
          sx={{
            "& .MuiTab-root": { color: "var(--text-color)" }, // 各タブのテキストカラーをCSS変数で設定
            "& .Mui-selected": { color: "var(--text-color)" }, // 選択されたタブのテキストカラーもCSS変数で設定
          }}
        >
          <Tab label="My Dogs" value={0} /> {/* タブ1 */}
          <Tab label="カレンダー" value={1} /> {/* タブ2 */}
          <Tab label="今日の出来事" value={2} /> {/* タブ3 */}
          <Tab label="登録" value={3} /> {/* タブ4 */}
        </Tabs>
      </Box>

      <Swiper
        onSwiper={setSwiper} // Swiperのインスタンスをstateに保存
        onSlideChange={handleSlideChange} // スライドが変更されたときにタブの状態を更新
        spaceBetween={50} // スライド間のスペース
        slidesPerView={1} // 一度に表示するスライド数
      >
        <SwiperSlide>
          <Slide_Mydogs /> {/* タブ1のスライド */}
        </SwiperSlide>
        <SwiperSlide>
          <Slide_Calendar /> {/* タブ2のスライド */}
        </SwiperSlide>
        <SwiperSlide>
          <Slide_Posts /> {/* タブ3のスライド */}
        </SwiperSlide>
        <SwiperSlide>
          <Slide_Pets /> {/* タブ4のスライド */}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useState } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import TodayDogImageModal from "@/components/posts/popup_today_dog_modal"; // モーダルコンポーネントをインポートしています。

export default function Post_Footer({ theme }) {
  const [modal_dog_Open, setModal_dog_Open] = useState(false); // モーダルの開閉状態を管理するためのstateを定義しています。

  // モーダルを開く関数
  const openModal_today_dog = () => {
    setModal_dog_Open(true);
  };

  // モーダルを閉じる関数
  const closeModal_today_dog = () => {
    setModal_dog_Open(false);
  };

  return (
    <div
      style={{
        bottom: 10,
        width: "100%",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <div>
        <button
          className="btn btn-primary m-2 text-1xl"
          onClick={openModal_today_dog}
        >
          今日のわんこ名言！！
        </button>
      </div>
      <TodayDogImageModal
        open={modal_dog_Open}
        handleClose={closeModal_today_dog}
      />
    </div>
  );
}

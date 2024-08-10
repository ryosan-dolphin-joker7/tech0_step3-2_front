"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useState } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import UploadImageModal from "@/components/modal"; // モーダルコンポーネントをインポートしています。
import TodayDogImageModal from "@/components/modal_today_dog"; // モーダルコンポーネントをインポートしています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。

export default function Post_Footer({ theme }) {
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を管理するためのstateを定義しています。
  const [modal_dog_Open, setModal_dog_Open] = useState(false); // モーダルの開閉状態を管理するためのstateを定義しています。

  // モーダルを開く関数
  const openModal = () => {
    setModalOpen(true);
  };

  // モーダルを開く関数
  const openModal_today_dog = () => {
    setModal_dog_Open(true);
  };

  // モーダルを閉じる関数
  const closeModal_today_dog = () => {
    setModal_dog_Open(false);
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setModalOpen(false);
  };

  // 画像をアップロードする関数
  const handleUpload = (image) => {
    console.log("Uploading image:", image);
    // ここに画像をアップロードするロジックを追加します
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 50,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <div>
        <button className="btn btn-primary m-2 text-1xl" onClick={openModal}>
          WanPush
        </button>

        <button
          className="btn btn-primary m-2 text-1xl"
          onClick={openModal_today_dog}
        >
          今日のわんこ！！
        </button>
      </div>
      <UploadImageModal
        open={modalOpen}
        handleClose={closeModal}
        handleUpload={handleUpload}
      />
      <TodayDogImageModal
        open={modal_dog_Open}
        handleClose={closeModal_today_dog}
      />
    </div>
  );
}

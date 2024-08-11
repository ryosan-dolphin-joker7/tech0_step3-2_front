"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useState } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import UploadImageModal from "@/components/posts/post_photo_modal"; // モーダルコンポーネントをインポートしています。

export default function Footer_Post({ theme }) {
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を管理するためのstateを初期化しています。

  // モーダルを開く関数
  const openModal = () => {
    setModalOpen(true);
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
        position: "fixed", // フッターを画面下部に固定
        bottom: 50,
        width: "100%",
        zIndex: 1000,
        textAlign: "center",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={openModal} // ボタンがクリックされたときにモーダルを開きます
        style={{ margin: "8px", fontSize: "1rem" }} // ボタンのスタイルを調整します
      >
        WanPush
      </Button>

      <UploadImageModal
        open={modalOpen} // モーダルの開閉状態を制御
        handleClose={closeModal} // モーダルを閉じる関数を渡します
        handleUpload={handleUpload} // 画像アップロード関数を渡します
      />
    </div>
  );
}

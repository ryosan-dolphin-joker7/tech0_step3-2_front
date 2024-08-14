"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useState } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import UploadTodoModal from "@/components/posts/post_todo_modal"; // モーダルコンポーネントをインポートしています。

export default function Post_Footer({ theme }) {
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を管理するためのstateを定義しています。

  // モーダルを開く関数
  const openModal = () => {
    setModalOpen(true);
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setModalOpen(false);
  };

  // 予定をアップロードする関数
  return (
    <div
      style={{
        bottom: 10,
        width: "100%",
      }}
    >
      <div>
        <Button
          variant="contained"
          onClick={openModal}
          sx={{
            borderRadius: 50,
            "&:hover": {
              backgroundColor: theme === "light" ? "#303f9f" : "#c51162",
            },
          }}
        >
          予定を登録する
        </Button>
      </div>
      <UploadTodoModal open={modalOpen} handleClose={closeModal} />
    </div>
  );
}

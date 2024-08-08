"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [dogImage, setDogImage] = useState(null);
  const [comment, setComment] = useState(""); // コメントの状態を追加

  // 犬の画像とコメントをAPIから取得する関数
  const fetchData = async () => {
    try {
      const dogResponse = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );
      const dogData = await dogResponse.json();
      setDogImage(dogData.message);

      const commentResponse = await fetch("https://api.adviceslip.com/advice");
      const commentData = await commentResponse.json();
      setComment(commentData.slip.advice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // モーダルが開いた時にデータを取得
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>今日のわんこ！！</DialogTitle>
      <DialogContent>
        {comment && <p>{comment}</p>}
        {dogImage && (
          <>
            <img
              src={dogImage}
              alt="Dog"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
        <Button onClick={fetchData}>もう一回</Button>
      </DialogActions>
    </Dialog>
  );
}

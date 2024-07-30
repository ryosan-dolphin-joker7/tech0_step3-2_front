"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [dogImage, setDogImage] = useState(null);

  // 犬の画像をAPIから取得する関数
  const getDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  // モーダルが開いた時に犬の画像を取得
  useEffect(() => {
    if (open) {
      getDogImage();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>今日のわんこ！！</DialogTitle>

      <DialogContent>
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
        <Button onClick={getDogImage}>もう一回</Button>
      </DialogActions>
    </Dialog>
  );
}

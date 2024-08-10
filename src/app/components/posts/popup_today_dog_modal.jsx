"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

// Google翻訳APIのURLを設定
const GOOGLE_TRANSLATE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";

export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [dogImage, setDogImage] = useState(null);
  const [comment, setComment] = useState(""); // コメントの状態を追加
  const [translatedComment, setTranslatedComment] = useState(""); // 翻訳されたコメントの状態を追加

  // 環境変数からAPIキーを取得
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

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
      const originalComment = commentData.slip.advice;
      setComment(originalComment);

      // 取得したコメントを日本語に翻訳する
      const translatedText = await translateText(originalComment);
      setTranslatedComment(translatedText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 翻訳を行う関数
  const translateText = async (text) => {
    try {
      const response = await fetch(
        `${GOOGLE_TRANSLATE_API_URL}?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            q: text,
            target: "ja", // 翻訳先の言語コード (日本語)
            format: "text",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.data && data.data.translations.length > 0) {
        return data.data.translations[0].translatedText;
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // 翻訳が失敗した場合は元のテキストを返す
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
        {translatedComment && <p>{translatedComment}</p>}
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

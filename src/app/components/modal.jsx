"use client"; // クライアント側で動作するコードであることを指定しています。

import React from "react";
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートしています。
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

// このコンポーネントは画像をアップロードするためのモーダルダイアログを表現しています。
export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [image, setImage] = React.useState(null); // 画像ファイルを保持するためのステートを定義しています。
  const [description, setDescription] = React.useState(""); // 投稿内容のテキストを保持するためのステートを定義しています。

  // 画像が選択されたときに呼び出される関数です。
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // 選択されたファイルをステートに保存します。
  };

  // 投稿ボタンが押されたときに呼び出される関数です。
  const handleSubmit = async () => {
    if (image && description) {
      const fileName = `${Date.now()}_${image.name}`; // ファイル名を現在のタイムスタンプと選択されたファイル名を組み合わせて生成します。
      const { data, error } = await supabase.storage
        .from("one_push_photo")
        .upload(fileName, image); // 画像をSupabaseストレージにアップロードします。

      if (error) {
        console.error("Error uploading image:", error);
        return;
      }

      // 公開URLを取得
      const { publicURL, error: publicUrlError } = supabase.storage
        .from("one_push_photo")
        .getPublicUrl(fileName);

      if (publicUrlError) {
        console.error("Error getting public URL:", publicUrlError);
        return;
      }

      const imageUrl = publicURL; // アップロードされた画像の公開URLを取得します。
      console.log("Image URL:", imageUrl);

      const { data: insertData, error: insertError } = await supabase
        .from("tasks")
        .insert([
          {
            photo_url: imageUrl,
            task_name: description,
            date: new Date().toISOString(), // 現在の日付をISOフォーマットで保存します。
          },
        ]); // 画像URL、説明テキスト、現在の日付をデータベースに挿入します。

      if (insertError) {
        console.error("Error inserting data:", insertError);
        return;
      }

      handleUpload(image); // 画像アップロードハンドラを呼び出します。
      handleClose(); // モーダルを閉じます。
    }
  };

  // コンポーネントのレンダリング内容を定義しています。
  return (
    // Dialogコンポーネントはモーダルダイアログを表現します。
    <Dialog open={open} onClose={handleClose}>
      {/* ダイアログのタイトルを表示します。 */}
      <DialogTitle>今日の出来事を投稿する</DialogTitle>

      {/* ダイアログのコンテンツを表示します。 */}
      <DialogContent>
        {/* 画像ファイルを選択するための入力フィールドを表示します。 */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {/* 画像が選択されている場合、そのプレビューを表示します。 */}
        {image && (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </>
        )}
        {/* テキスト入力フィールドを表示します。 */}
        <TextField
          autoFocus
          required
          margin="dense"
          label="今日の出来事は？"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // テキスト入力の値をステートに保存します。
        />
      </DialogContent>

      {/* ダイアログのアクションボタンを表示します。 */}
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>{" "}
        {/* キャンセルボタン */}
        <Button onClick={handleSubmit} color="primary">
          投稿 {/* 投稿ボタン */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

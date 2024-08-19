"use client"; // クライアント側で動作するコードであることを指定しています。
import React from "react";
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートしています。
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

// このコンポーネントは画像をアップロードするためのモーダルダイアログを表現しています。
export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [image, setImage] = React.useState(null); // 画像ファイルを保持するためのstateを初期化します。
  const [description, setDescription] = React.useState(""); // 投稿内容のテキストを保持するためのstateを初期化します。
  const [loading, setLoading] = React.useState(false); // ローディング状態を管理するstateを初期化します。
  const [error, setError] = React.useState(null); // エラーメッセージを保持するためのstateを初期化します。

  // 画像が選択されたときに呼び出される関数です。
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 選択されたファイルを取得します。
    if (file && file.type.startsWith("image/")) {
      // ファイルが画像ファイルであるかチェックします。
      setImage(file); // 選択されたファイルをstateに保存します。
    } else {
      setError("画像ファイルを選択してください"); // 無効なファイル形式の場合、エラーメッセージを設定します。
    }
  };

  // 投稿ボタンが押されたときに呼び出される関数です。
  const handleSubmit = async () => {
    if (image && description) {
      // 画像と説明が両方とも存在するかチェックします。
      setLoading(true); // ローディング状態を開始します。
      setError(null); // エラーメッセージをクリアします。

      try {
        // ファイル名を正しくエンコードして処理します。
        const encodedFileName = encodeURIComponent(image.name).replace(
          /%20/g,
          "_"
        );
        const fileName = `img/${Date.now()}_${encodedFileName}`; // ユニークなファイル名を生成します。

        // 画像をSupabaseストレージにアップロードします。
        const { data, error: uploadError } = await supabase.storage
          .from("one_push_photo")
          .upload(fileName, image);

        if (uploadError) throw new Error(uploadError.message); // アップロードエラーが発生した場合、例外をスローします。

        // アップロードされた画像の公開URLを取得します。
        const { publicUrl } = supabase.storage
          .from("one_push_photo")
          .getPublicUrl(fileName).data;

        if (!publicUrl) throw new Error("公開URLの取得に失敗しました"); // 公開URLの取得に失敗した場合、例外をスローします。

        // 画像URLと説明をデータベースに保存します。
        const { error: insertError } = await supabase.from("tasks").insert([
          {
            photo_url: publicUrl,
            task_name: description,
            date: new Date().toISOString(), // 現在の日付をISO形式で保存します。
          },
        ]);

        if (insertError) throw new Error(insertError.message); // データ挿入エラーが発生した場合、例外をスローします。

        handleUpload(image); // 画像アップロード後の処理を実行します。
        handleClose(); // モーダルを閉じます。
      } catch (err) {
        setError(err.message); // エラーメッセージを設定します。
      } finally {
        setLoading(false); // ローディング状態を終了します。
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>今日の出来事を投稿する</DialogTitle>

      <DialogContent>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          label="今日の出来事は？"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "投稿"}
        </Button>
      </DialogActions>

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Dialog>
  );
}

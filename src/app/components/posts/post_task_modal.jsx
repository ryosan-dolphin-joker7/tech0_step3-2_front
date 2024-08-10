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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

// このコンポーネントは画像をアップロードするためのモーダルダイアログを表現しています。
export default function UploadImageModal({ open, handleClose, handleUpload }) {
  const [image, setImage] = React.useState(null); // 画像ファイルを保持するためのステートを定義しています。
  const [description, setDescription] = React.useState(""); // 投稿内容のテキストを保持するためのステートを定義しています。
  const [loading, setLoading] = React.useState(false); // ローディング状態を管理するステートを定義しています。
  const [error, setError] = React.useState(null); // エラーメッセージを保持するためのステートを定義しています。

  // 投稿ボタンが押されたときに呼び出される関数です。
  const handleSubmit = async () => {
    if (description) {
      // 画像と説明が両方とも存在するかチェックします。
      setLoading(true); // ローディング状態を開始します。
      setError(null); // エラーメッセージをクリアします。

      try {
        const { error: insertError } = await supabase.from("tasks").insert([
          {
            photo_url: publicUrl,
            task_name: description,
            date: new Date().toISOString(), // 現在の日付をISOフォーマットで保存します。
          },
        ]); // 画像URL、説明テキスト、現在の日付をデータベースに挿入します。

        if (insertError) throw new Error(insertError.message); // データ挿入エラーが発生した場合、例外をスローします。

        handleUpload(image); // 画像アップロードハンドラを呼び出します。
        handleClose(); // モーダルを閉じます。
      } catch (err) {
        setError(err.message); // エラーメッセージを設定します。
      } finally {
        setLoading(false); // ローディング状態を終了します。
      }
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
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "投稿"}{" "}
          {/* ローディング中はインディケーターを表示 */}
        </Button>
      </DialogActions>

      {/* エラーメッセージを表示します。 */}
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

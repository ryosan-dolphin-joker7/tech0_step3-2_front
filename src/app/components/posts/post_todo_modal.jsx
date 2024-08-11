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

// このコンポーネントはTodoを登録するためのモーダルダイアログを表現しています。
export default function UploadTodoModal({ open, handleClose }) {
  const [title, setTitle] = React.useState(""); // タイトルを保持するためのステートを定義しています。
  const [contents, setContents] = React.useState(""); // 内容を保持するためのステートを定義しています。
  const [endDate, setEndDate] = React.useState(""); // 終了日を保持するためのステートを定義しています。
  const [loading, setLoading] = React.useState(false); // ローディング状態を管理するステートを定義しています。
  const [error, setError] = React.useState(null); // エラーメッセージを保持するためのステートを定義しています。

  // 投稿ボタンが押されたときに呼び出される関数です。
  const handleSubmit = async () => {
    if (title && contents && endDate) {
      setLoading(true); // ローディング状態を開始します。
      setError(null); // エラーメッセージをクリアします。

      try {
        const { error: insertError } = await supabase.from("todos").insert([
          {
            title: title, // 入力されたタイトルを登録します。
            contents: contents, // 入力された内容を登録します。
            start_date: new Date().toISOString(), // 今日の日付をstart_dateとして登録します。
            end_date: endDate, // 入力された終了日を登録します。
          },
        ]);

        if (insertError) throw new Error(insertError.message); // データ挿入エラーが発生した場合、例外をスローします。

        handleClose(); // モーダルを閉じます。
      } catch (err) {
        setError(err.message); // エラーメッセージを設定します。
      } finally {
        setLoading(false); // ローディング状態を終了します。
      }
    } else {
      setError("すべてのフィールドを入力してください"); // フィールドが未入力の場合はエラーメッセージを設定します。
    }
  };

  // コンポーネントのレンダリング内容を定義しています。
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Todoを登録する</DialogTitle>

      <DialogContent>
        {/* タイトル入力フィールド */}
        <TextField
          autoFocus
          required
          margin="dense"
          label="タイトル"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // タイトルの値をステートに保存します。
        />
        {/* 内容入力フィールド */}
        <TextField
          required
          margin="dense"
          label="内容"
          fullWidth
          variant="outlined"
          value={contents}
          onChange={(e) => setContents(e.target.value)} // 内容の値をステートに保存します。
        />
        {/* 終了日入力フィールド */}
        <TextField
          required
          margin="dense"
          label="終了日"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} // 終了日の値をステートに保存します。
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

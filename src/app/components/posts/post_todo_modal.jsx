"use client"; // クライアントサイドで実行されるコードであることを指定しています。

import React from "react";
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートします。これを使ってデータベース操作を行います。
import {
  Dialog, // モーダル（ダイアログ）を表示するためのコンポーネントです。
  DialogActions, // モーダル内のボタンなどのアクションを配置する部分です。
  DialogContent, // モーダル内のメインコンテンツ（テキストフィールドなど）を配置する部分です。
  DialogTitle, // モーダルのタイトルを表示する部分です。
  Button, // ボタンコンポーネントです。
  TextField, // テキスト入力フィールドを表示するコンポーネントです。
  CircularProgress, // ローディングスピナーを表示するコンポーネントです。
  Snackbar, // 一時的なメッセージを表示するコンポーネントです（通知バーのようなもの）。
  Alert, // アラートメッセージを表示するコンポーネントです（エラーメッセージなどに使用）。
} from "@mui/material"; // Material-UIのコンポーネントをインポートします。

export default function UploadTodoModal({
  open, // モーダルが現在開いているかどうかを示すフラグ（true/false）。
  handleClose, // モーダルを閉じるための関数です。モーダルを閉じるときに呼び出します。
  userid, // 現在ログインしているユーザーのIDです。このIDを使ってデータベースにユーザーを関連付けます。
  family_id, // 現在ログインしているファミリーのIDです。このIDを使ってデータベースにファミリーを関連付けます。
  onTodoAdded, // 新しいTodoが追加されたときに呼び出される関数です。画面の更新などに使用します。
}) {
  // モーダル内のフォームの各フィールド（タイトル、内容、終了日）を管理するための状態を定義します。
  const [title, setTitle] = React.useState(""); // タイトルの状態を管理します。
  const [contents, setContents] = React.useState(""); // 内容の状態を管理します。
  const [endDate, setEndDate] = React.useState(""); // 終了日の状態を管理します。
  const [loading, setLoading] = React.useState(false); // 投稿処理が進行中かどうかを管理します。
  const [error, setError] = React.useState(null); // エラーメッセージを管理します。

  // 投稿ボタンが押されたときに呼び出される関数です。
  const handleSubmit = async () => {
    if (title && contents && endDate) {
      // 全ての入力フィールドが埋まっているか確認します。
      setLoading(true); // 投稿処理が開始されるので、ローディング状態にします。
      setError(null); // エラー状態をリセットします。

      try {
        // Supabaseを使用して新しいTodoをデータベースに挿入します。
        const { error: insertError } = await supabase.from("todos").insert([
          {
            title: title, // 入力されたタイトルをデータベースに保存します。
            contents: contents, // 入力された内容をデータベースに保存します。
            start_date: new Date().toISOString(), // 現在の日付をISOフォーマットで保存します（開始日として）。
            end_date: endDate, // 入力された終了日をデータベースに保存します。
            assignee_user_id: userid, // 現在ログインしているユーザーのIDを保存します（誰のTodoか識別するため）。
            family_id: family_id, // 現在ログインしているファミリーのIDを保存します（誰のTodoか識別するため）。
          },
        ]);

        if (insertError) throw new Error(insertError.message); // データベースへの挿入中にエラーが発生した場合、エラーメッセージを設定します。

        console.log("Todo added, calling onTodoAdded..."); // デバッグログ：Todoが追加された後に呼び出される
        onTodoAdded(); // Todoが追加された後、画面を更新するための関数を呼び出します。
        handleClose(); // モーダルを閉じます。
      } catch (err) {
        setError(err.message); // エラーが発生した場合、そのエラーメッセージを設定します。
      } finally {
        setLoading(false); // 処理が完了したらローディング状態を解除します。
      }
    } else {
      setError("すべてのフィールドを入力してください"); // 必須フィールドが埋まっていない場合、エラーメッセージを表示します。
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {" "}
      {/* モーダルが開いているか閉じているかを管理します */}
      <DialogTitle>Todoを登録する</DialogTitle>{" "}
      {/* モーダルのタイトルを表示します */}
      <DialogContent>
        {/* タイトル入力フィールド */}
        <TextField
          autoFocus
          required
          margin="dense"
          label="タイトル"
          fullWidth
          variant="outlined"
          value={title} // 現在のタイトルの状態を表示します。
          onChange={(e) => setTitle(e.target.value)} // タイトルが変更されたときに状態を更新します。
        />
        {/* 内容入力フィールド */}
        <TextField
          required
          margin="dense"
          label="内容"
          fullWidth
          variant="outlined"
          value={contents} // 現在の内容の状態を表示します。
          onChange={(e) => setContents(e.target.value)} // 内容が変更されたときに状態を更新します。
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
            shrink: true, // ラベルがフィールドの上に表示されるようにします。
          }}
          value={endDate} // 現在の終了日の状態を表示します。
          onChange={(e) => setEndDate(e.target.value)} // 終了日が変更されたときに状態を更新します。
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>{" "}
        {/* キャンセルボタンを押すとモーダルが閉じます */}
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {" "}
          {/* 投稿ボタン。ローディング中はボタンが無効になります */}
          {loading ? <CircularProgress size={24} /> : "投稿"}{" "}
          {/* ローディング中はスピナーを表示し、そうでなければ「投稿」テキストを表示します */}
        </Button>
      </DialogActions>
      {error && ( // エラーが発生している場合、エラーメッセージをSnackbarで表示します。
        <Snackbar
          open={!!error}
          autoHideDuration={6000} // メッセージは6秒後に自動的に閉じます。
          onClose={() => setError(null)} // メッセージが閉じられるときにエラーをリセットします。
        >
          <Alert onClose={() => setError(null)} severity="error">
            {" "}
            {/* エラーの内容を表示します */}
            {error}
          </Alert>
        </Snackbar>
      )}
    </Dialog>
  );
}

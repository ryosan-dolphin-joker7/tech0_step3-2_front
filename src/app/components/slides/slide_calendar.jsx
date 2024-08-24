// components/Slide_Calendar.jsx
import React, { useState, useEffect, useCallback, useContext } from "react";
import Post_Todo from "@/components/posts/post_todo";
import CalendarComponent from "@/components/CalendarComponent";
import Calendar_Table_Todo from "@/components/calendar_table_todo"; // calendar_table_todoコンポーネントをインポート
import { supabase } from "@/app/supabaseClient";
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";

export default function Slide_Calendar() {
  const [events, setEvents] = useState([]); // カレンダーに表示するイベントの状態
  const [tableData, setTableData] = useState([]); // テーブルに表示するデータの状態
  const [loading, setLoading] = useState(false); // ローディング状態を管理する状態
  const [error, setError] = useState(null); // エラーメッセージを管理する状態
  const { selectedAccount } = useContext(AccountContext); // AccountContextからselectedAccountを取得

  // Supabaseからイベントを取得する非同期関数
  const fetchEvents = useCallback(async () => {
    setLoading(true); // データ取得の開始時にローディング状態をtrueに設定
    setError(null); // 新たな取得時にエラーをクリア

    try {
      // Supabaseから"todos"テーブルのデータを取得
      const { data, error } = await supabase.from("todos").select(`
        *,
        assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
        completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
      `);

      if (error) {
        throw error; // エラーがあればcatchブロックで処理するために例外を投げる
      }

      // selectedAccountに対応するイベントのみをフィルタリング
      const filteredData = data.filter(
        (item) => item.assignee.family_id === selectedAccount
      );

      // フィルタリングしたデータをFullCalendarに適した形式にフォーマット
      const formattedEvents = filteredData.map((item) => ({
        title: item.title, // イベントのタイトル
        start: item.end_date, // イベントの終了日（開始日として設定）
        icon: <PetsIcon style={{ fontSize: "1.5rem", color: "#3f51b5" }} />, // アイコン
      }));

      setEvents(formattedEvents); // FullCalendar用にフォーマットしたデータを更新
      setTableData(filteredData); // テーブル用のデータを更新
    } catch (error) {
      console.error("Error fetching events:", error); // エラーハンドリング
      setError("データの取得に失敗しました。もう一度お試しください。"); // ユーザーにエラーメッセージを表示
    } finally {
      setLoading(false); // データの取得が完了したらローディング状態を解除
    }
  }, [selectedAccount]); // selectedAccountが変わるたびにこの関数が再生成される

  // コンポーネントが初めてレンダリングされたときにイベントを取得
  useEffect(() => {
    fetchEvents(); // 初回レンダリング時にイベントを取得
  }, [fetchEvents]);

  return (
    <div>
      {/* カレンダーを中央に配置するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ maxWidth: "100%", fontSize: "0.8em" }}>
            <CalendarComponent
              events={events} // カレンダーに表示するイベントを設定
              onWindowResize={() => {}} // ウィンドウサイズ変更時の処理を設定
            />
          </div>
        </Grid>
      </Grid>

      {/* Todoリストを表示するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div
            style={{
              textAlign: "center", // テキストを中央揃えにする
              maxHeight: "300px", // 最大高さを300pxに設定
              overflowY: "auto", // 縦方向にスクロール可能にする
              fontSize: "0.8em", // フォントサイズを0.8emに設定
              padding: "10px", // 内側の余白を10pxに設定
            }}
          >
            <Calendar_Table_Todo
              todos={tableData}
              loading={loading}
              error={error}
            />
            {/* Slide_Calendar から取得したデータをpropsとして渡す */}
          </div>
        </Grid>
      </Grid>

      {/* Todoの新規投稿ボタンを表示するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Post_Todo refreshTodos={fetchEvents} />
            {/* Todo投稿コンポーネント、投稿後にイベントをリフレッシュ */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

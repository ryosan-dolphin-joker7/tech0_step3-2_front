import React, { useState, useEffect, useCallback, useContext } from "react";
import Post_Todo from "@/components/posts/post_todo";
import CalendarComponent from "@/components/CalendarComponent";
import Calendar_Table_Todo from "@/components/calendar_table_todo";
import { AccountContext } from "@/components/AccountProvider";
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import { supabase } from "@/app/supabaseClient";
import { getSession } from "next-auth/react"; // NextAuthからセッションを取得するための関数をインポート

// クライアントサイドで使用するSupabaseクライアントを使ってデータを取得する関数
async function fetchTodoData(selectedAccount) {
  try {
    const { data, error } = await supabase.from("todos").select(`
      *,
      assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
      completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
    `);

    if (error) {
      throw error;
    }

    const filteredData = data.filter(
      (item) => item.assignee.family_id === selectedAccount
    );

    const formattedEvents = filteredData.map((item) => ({
      title: item.title,
      start: item.end_date,
      icon: <PetsIcon style={{ fontSize: "1.5rem", color: "#3f51b5" }} />,
    }));

    return { formattedEvents, filteredData };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

// サーバーサイドで実行される関数。ページがリクエストされたときにサーバーでデータを取得して返す
export async function getServerSideProps(context) {
  // NextAuthを使ってセッションを取得
  const session = await getSession(context);

  // セッションが存在しない場合、未ログインとして処理
  if (!session) {
    return {
      redirect: {
        destination: "/login", // ログインページにリダイレクト
        permanent: false,
      },
    };
  }

  // セッションから family_id を取得
  const selectedAccount = session.family_id;

  try {
    // Supabaseからデータを取得
    const { formattedEvents, filteredData } = await fetchTodoData(
      selectedAccount
    );

    // ページコンポーネントに渡すために、取得したデータをpropsとして返す
    return {
      props: {
        initialEvents: formattedEvents, // カレンダーの初期イベントデータ
        initialTableData: filteredData, // Todoリストの初期データ
        selectedAccount, // クライアントサイドでも使用できるようにアカウント情報を渡す
      },
    };
  } catch (error) {
    return {
      props: {
        initialEvents: [],
        initialTableData: [],
        error: "データの取得に失敗しました。",
      },
    };
  }
}

// Slide_Calendarコンポーネント: カレンダーとTodoリストを表示するメインコンポーネント
export default function Slide_Calendar({
  initialEvents,
  initialTableData,
  error,
  selectedAccount: serverSideAccount, // サーバーサイドから渡されたアカウント情報
}) {
  const [events, setEvents] = useState(initialEvents); // カレンダーに表示するイベントの状態を管理
  const [tableData, setTableData] = useState(initialTableData); // テーブルに表示するデータの状態を管理
  const [loading, setLoading] = useState(false); // データ取得中のローディング状態を管理
  const { selectedAccount } = useContext(AccountContext) || serverSideAccount; // クライアントサイドのアカウント情報を取得

  // Supabaseからイベントを再取得する非同期関数
  const refreshEvents = useCallback(async () => {
    setLoading(true); // データ取得中はローディング状態をtrueに設定
    try {
      const { formattedEvents, filteredData } = await fetchTodoData(
        selectedAccount
      );
      setEvents(formattedEvents); // 新しいイベントデータを状態にセット
      setTableData(filteredData); // 新しいTodoリストデータを状態にセット
    } catch (error) {
      console.error("Error refreshing events:", error); // エラーが発生した場合にエラーメッセージを表示
    } finally {
      setLoading(false); // データ取得後にローディング状態を解除
    }
  }, [selectedAccount]);

  // `selectedAccount` が変更されたときにデータを再取得する
  useEffect(() => {
    refreshEvents(); // `selectedAccount` または `refreshEvents` 関数が変更されるたびに実行
  }, [selectedAccount, refreshEvents]);

  return (
    <div>
      {/* カレンダーを中央に配置するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ maxWidth: "100%", fontSize: "0.8em" }}>
            <CalendarComponent events={events} onWindowResize={() => {}} />
          </div>
        </Grid>
      </Grid>

      {/* Todoリストを表示するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div
            style={{
              textAlign: "center",
              maxHeight: "300px",
              overflowY: "auto",
              fontSize: "0.8em",
              padding: "10px",
            }}
          >
            <Calendar_Table_Todo
              todos={tableData} // Todoリストに表示するデータ
              loading={loading} // ローディング状態
              error={error} // エラーがあればそれを表示
            />
          </div>
        </Grid>
      </Grid>

      {/* Todoの新規投稿ボタンを表示するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Post_Todo refreshTodos={refreshEvents} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

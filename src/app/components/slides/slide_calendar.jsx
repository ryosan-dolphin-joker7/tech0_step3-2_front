import React, { useRef, useEffect, useState } from "react"; // Reactの機能をインポート
import Grid from "@mui/material/Grid"; // MUIのGridレイアウトコンポーネントをインポート
import FullCalendar from "@fullcalendar/react"; // FullCalendarコンポーネントをインポート
import dayGridPlugin from "@fullcalendar/daygrid"; // FullCalendarの月表示プラグインをインポート
import interactionPlugin from "@fullcalendar/interaction"; // FullCalendarのインタラクションプラグインをインポート
import timeGridPlugin from "@fullcalendar/timegrid"; // FullCalendarの週・日表示プラグインをインポート
import Post_Todo from "@/components/posts/post_todo"; // Todoの投稿コンポーネントをインポート
import Table_Todo from "@/components/calendar_table_todo"; // Todoのテーブル表示コンポーネントをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート

import PetsIcon from "@mui/icons-material/Pets"; // ペットのアイコンをインポート

export default function Slide_Calendar() {
  const calendarRef = useRef(null); // FullCalendarコンポーネントへの参照を作成
  const [events, setEvents] = useState([]); // イベント情報を格納する状態を初期化

  // Supabaseからイベントを取得する非同期関数
  const fetchEvents = async () => {
    //console.log("Fetching events..."); // デバッグログ：イベントの取得を開始
    const { data, error } = await supabase.from("todos").select("*"); // Supabaseから"todos"テーブルの全データを取得

    if (error) {
      console.error("Error fetching events:", error); // エラーが発生した場合、コンソールにエラーメッセージを表示
    } else {
      // 取得したデータをFullCalendarに適した形式にフォーマット
      const formattedEvents = data.map((item) => ({
        title: item.title, // イベントのタイトル
        start: item.end_date, // イベントの開始日
        icon: <PetsIcon style={{ fontSize: "1.5rem", color: "#3f51b5" }} />, // イベントにペットアイコンを追加
      }));

      //console.log("Events fetched:", formattedEvents); // デバッグログ：取得したイベントの内容を表示
      setEvents(formattedEvents); // フォーマット済みのイベントを状態に保存
    }
  };

  // コンポーネントが初めてレンダリングされたときにイベントを取得する
  useEffect(() => {
    fetchEvents(); // 初回レンダリング時にイベントを取得
  }, []);

  // イベントが更新されたときにカレンダーを再描画する
  useEffect(() => {
    //console.log("Events state updated:", events); // デバッグログ：イベントの状態が更新されたときに表示
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents(); // カレンダーのイベントを再取得して更新
    }
  }, [events]);

  // カレンダーイベントのカスタム表示を行う関数
  const renderEventContent = (eventInfo) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          height: "auto",
        }}
      >
        {eventInfo.event.extendedProps.icon}{" "}
        {/* イベントに付随するアイコンを表示 */}
        <span style={{ marginLeft: "5px", fontSize: "1em" }}>
          {eventInfo.event.title} {/* イベントのタイトルを表示 */}
        </span>
      </div>
    );
  };

  //console.log("Rendering Slide_Calendar component..."); // デバッグログ：コンポーネントがレンダリングされるたびに表示

  return (
    <div>
      {/* カレンダーを中央に配置するためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ maxWidth: "100%", fontSize: "0.8em" }}>
            <FullCalendar
              ref={calendarRef} // FullCalendarコンポーネントへの参照を設定
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // カレンダープラグインの設定
              initialView="dayGridMonth" // 初期表示を月表示に設定
              headerToolbar={{
                left: "prev,next today", // カレンダーのヘッダーツールバーの左側に表示するボタン
                center: "title", // ヘッダーの中央にタイトルを表示
                right: "dayGridMonth,timeGridWeek,timeGridDay", // ヘッダーの右側に表示するボタン
              }}
              events={events} // カレンダーに表示するイベントを設定
              eventContent={renderEventContent} // イベントのカスタム表示を設定
              eventDisplay="block" // イベントをブロック表示
              height={400} // カレンダーの高さを設定
              contentHeight={400} // カレンダーのコンテンツ高さを設定
              aspectRatio={2} // カレンダーのアスペクト比を設定
              dayMaxEventRows={true} // 1日に表示するイベント数の上限を設定
              windowResize={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().updateSize(); // ウィンドウサイズ変更時にカレンダーサイズを更新
                }
              }}
            />
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
            <Table_Todo /> {/* Todoリストを表示するコンポーネント */}
          </div>
        </Grid>
      </Grid>

      {/* Todoの新規投稿を行うためのグリッドレイアウト */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Post_Todo refreshTodos={fetchEvents} />{" "}
            {/* Todo投稿コンポーネント、投稿後にイベントをリフレッシュ */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Post_Todo from "@/app/components/posts/post_todo";
import Calendar_Table_Todo from "@/app/components/calendar_table_todo";
import { supabase } from "@/app/supabaseClient";
import PetsIcon from "@mui/icons-material/Pets";
import { AccountContext } from "@/app/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート

export default function Slide_Calendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const { selectedAccount } = useContext(AccountContext); // AccountContextからselectedAccountを取得

  // Supabaseからイベントを取得する非同期関数
  const fetchEvents = useCallback(async () => {
    try {
      // Supabaseから"todos"テーブルの全データを取得
      const { data, error } = await supabase
        .from("todos")
        .select(
          "*,assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id)"
        );
      if (error) throw error;

      // selectedAccountに対応するイベントのみをフィルタリング
      const filteredData = data.filter(
        (item) => item.assignee.family_id === selectedAccount
      );

      // フィルタリングしたデータをFullCalendarに適した形式にフォーマット
      const formattedEvents = filteredData.map((item) => ({
        title: item.title,
        start: item.end_date,
        icon: <PetsIcon style={{ fontSize: "1.5rem", color: "#3f51b5" }} />,
      }));

      setEvents(formattedEvents); // フォーマット済みのイベントを状態に保存
    } catch (error) {
      console.error("Error fetching events:", error); // エラーハンドリング
    }
  }, [selectedAccount]); // selectedAccountが変わるたびにこの関数が再生成される

  // コンポーネントが初めてレンダリングされたときにイベントを取得
  useEffect(() => {
    fetchEvents(); // 初回レンダリング時にイベントを取得
  }, [fetchEvents]);

  // イベントが更新されたときにカレンダーを再描画
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents(); // カレンダーのイベントを再取得して更新
    }
  }, [events]);

  // カレンダーイベントのカスタム表示を行う関数
  const renderEventContent = (eventInfo) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        height: "auto",
      }}
    >
      {eventInfo.event.extendedProps.icon}
      <span style={{ marginLeft: "5px", fontSize: "1em" }}>
        {eventInfo.event.title}
      </span>
    </div>
  );

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
              dayMaxEventRows // 1日に表示するイベント数の上限を設定
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
            <Calendar_Table_Todo /> {/* Todoリストを表示するコンポーネント */}
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

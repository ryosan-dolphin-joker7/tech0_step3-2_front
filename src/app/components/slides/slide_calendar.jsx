import React, {
  useEffect, // 副作用を扱うフック。データ取得などに使われる
  useState, // コンポーネントの状態を管理するフック
  useContext, // コンテキストを利用するフック。アカウント情報の共有に使用
  useRef, // DOM要素や他のオブジェクトへの参照を作成するフック
  useCallback, // 関数のメモ化を行い、不要な再生成を防ぐフック
} from "react";
import Post_Todo from "@/components/posts/post_todo";
import Calendar_Table_Todo from "@/components/calendar_table_todo";
import { supabase } from "@/app/supabaseClient";
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート

import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react"; // フルカレンダーのReactコンポーネント
import dayGridPlugin from "@fullcalendar/daygrid"; // 月ごとのカレンダービューを提供するプラグイン
import interactionPlugin from "@fullcalendar/interaction"; // カレンダーのクリックやドラッグ機能を提供するプラグイン
import timeGridPlugin from "@fullcalendar/timegrid"; // 週/日ごとのタイムラインビューを提供するプラグイン
import PetsIcon from "@mui/icons-material/Pets"; // ペットアイコンをインポート

export default function Slide_Calendar() {
  const calendarRef = useRef(null); // FullCalendarコンポーネントへの参照を作成
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

      setEvents(formattedEvents); // フォーマット済みのイベントを状態に保存
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
        display: "flex", // フレックスボックスレイアウトを使用してアイコンとタイトルを横並びに表示
        alignItems: "center", // 垂直方向に中央揃え
        justifyContent: "center", // 水平方向に中央揃え
        overflow: "visible", // コンテンツが溢れても表示する
        height: "auto", // 自動的に高さを調整
      }}
    >
      {eventInfo.event.extendedProps.icon}{" "}
      {/* イベントに設定されたアイコンを表示 */}
      <span style={{ marginLeft: "5px", fontSize: "1em" }}>
        {eventInfo.event.title} {/* イベントのタイトルを表示 */}
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
              textAlign: "center", // テキストを中央揃えにする
              maxHeight: "300px", // 最大高さを300pxに設定
              overflowY: "auto", // 縦方向にスクロール可能にする
              fontSize: "0.8em", // フォントサイズを0.8emに設定
              padding: "10px", // 内側の余白を10pxに設定
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
            <Post_Todo refreshTodos={fetchEvents} />
            {/* Todo投稿コンポーネント、投稿後にイベントをリフレッシュ */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

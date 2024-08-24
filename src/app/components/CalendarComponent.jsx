// components/CalendarComponent.jsx
import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // フルカレンダーのReactコンポーネント
import dayGridPlugin from "@fullcalendar/daygrid"; // 月ごとのカレンダービューを提供するプラグイン
import interactionPlugin from "@fullcalendar/interaction"; // カレンダーのクリックやドラッグ機能を提供するプラグイン
import timeGridPlugin from "@fullcalendar/timegrid"; // 週/日ごとのタイムラインビューを提供するプラグイン
import PetsIcon from "@mui/icons-material/Pets"; // ペットアイコンをインポート

export default function CalendarComponent({ events, onWindowResize }) {
  const calendarRef = useRef(null); // FullCalendarコンポーネントへの参照を作成

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
        onWindowResize(); // 親コンポーネントにサイズ変更を通知
      }}
    />
  );
}

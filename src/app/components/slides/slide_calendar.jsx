"use client"; // このコードがクライアントサイドで動作することを指定しています。
import React from "react";
import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Post_Todo from "@/components/posts/post_todo"; // フッターコンポーネントをインポートしています。
import Table_Todo from "@/components/calendar_table_todo"; // テーブルコンポーネントをインポートしています。

export default function Slide_Calendar() {
  return (
    <div>
      {/* カレンダーをグリッドで制御します */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // プラグインを設定して、カレンダーの機能を拡張します
            initialView="dayGridMonth" // カレンダーの初期表示を月ビューに設定
            headerToolbar={{
              left: "prev,next today", // ツールバーの左側に前後ボタンと「今日」のボタンを表示
              center: "title", // ツールバーの中央にカレンダーのタイトルを表示
              right: "dayGridMonth,timeGridWeek,timeGridDay", // ツールバーの右側に月・週・日ビューを切り替えるボタンを表示
            }}
            height={400} // カレンダー全体の高さを500pxに設定します
            contentHeight={400} // カレンダー内のコンテンツ部分の高さを400pxに設定します
            aspectRatio={2} // カレンダーの全体の縦横比を設定し、セルのサイズを調整します
            dayMaxEventRows={true} // イベントが多い場合にセル内で折り返して表示するオプション
            style={{ maxWidth: "100%", fontSize: "0.8em" }} // カレンダーのスタイルを調整し、フォントサイズを小さく設定します
          />
        </Grid>
      </Grid>

      {/* テーブルをグリッドで制御します */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div
            style={{
              textAlign: "center", // テーブル全体を中央寄せにします
              maxHeight: "300px", // テーブルの最大高さを300pxに設定します
              overflowY: "auto", // テーブルが高さを超える場合にスクロールバーを表示します
              fontSize: "0.8em", // テーブルの文字サイズを小さく設定します
            }}
          >
            <Table_Todo /> {/* テーブルコンポーネントを表示 */}
          </div>
        </Grid>
      </Grid>

      {/* フッターをグリッドで制御します */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ textAlign: "center" }}>
            <Post_Todo /> {/* フッターコンポーネントを表示 */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

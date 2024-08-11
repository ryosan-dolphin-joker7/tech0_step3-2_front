"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Post_Task from "@/components/posts/post_task"; // フッターコンポーネントをインポートしています。
import Table_Todo from "@/components/calendar_table_todo"; // フッターコンポーネントをインポートしています。

export default function Slide_Calendar() {
  return (
    <div>
      {/* カレンダーをグリッドで制御 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={500} // カレンダー全体の高さを600pxに設定
            contentHeight={400} // カレンダー内のコンテンツ部分の高さを500pxに設定
            style={{ maxWidth: "100%", fontSize: "0.8em" }}
          />
        </Grid>
      </Grid>

      {/* テーブルをグリッドで制御 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div
            style={{
              textAlign: "center",
              maxHeight: "300px", // テーブルの最大高さを300pxに設定
              overflowY: "auto", // テーブルが高さを超える場合にスクロールバーを表示
            }}
          >
            <Table_Todo />
          </div>
        </Grid>
      </Grid>

      {/* フッターをグリッドで制御 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div style={{ textAlign: "center" }}>
            <Post_Task />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Post_Task from "@/components/posts/post_task"; // フッターコンポーネントをインポートしています。

export default function Slide_Calendar() {
  return (
    <div>
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
            height="auto"
            contentHeight={400}
            style={{ maxWidth: "100%", fontSize: "0.8em" }}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: "center" }}>
        <Post_Task />
      </div>
    </div>
  );
}

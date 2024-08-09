"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// FullCalendarを動的にインポートし、サーバーサイドでのレンダリングを防ぐ
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

const dayGridPlugin = dynamic(() => import("@fullcalendar/daygrid"), {
  ssr: false,
});

const interactionPlugin = dynamic(() => import("@fullcalendar/interaction"), {
  ssr: false,
});

const timeGridPlugin = dynamic(() => import("@fullcalendar/timegrid"), {
  ssr: false,
});

export default function Slide2() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // マウント前は何も表示しない
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        カレンダー
      </Typography>
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
    </div>
  );
}

"use client"; // クライアント側で動作するコードであることを指定しています。
import { Button, Box, Grid } from "@mui/material"; // Material-UIのコンポーネントをインポートしています。
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskIcon from "@mui/icons-material/Task";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。

export default function Footer({ theme }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme === "light" ? "#fff" : "#333",
        padding: "0.1rem 0", // 高さを狭くするためのpadding調整
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Link href="/" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0", // ボタンの高さを調整
                minHeight: "40px", // 最小高さを設定
              }}
            >
              <HomeIcon />
              <div style={{ fontSize: "0.75rem" }}>Home</div>
            </Button>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "0.2rem 0", // ボタンの高さを調整
              minHeight: "50px", // 最小高さを設定
            }}
          >
            <SearchIcon />
            <div style={{ fontSize: "0.75rem" }}>検索</div>
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Link href="/table" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0", // ボタンの高さを調整
                minHeight: "50px", // 最小高さを設定
              }}
            >
              <CalendarTodayIcon />
              <div style={{ fontSize: "0.75rem" }}>日程</div>
            </Button>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link href="/tasks" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0", // ボタンの高さを調整
                minHeight: "50px", // 最小高さを設定
              }}
            >
              <TaskIcon />
              <div style={{ fontSize: "0.75rem" }}>タスク</div>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

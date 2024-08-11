"use client"; // クライアント側で動作するコードであることを指定しています。
import { Button, Box, Grid } from "@mui/material"; // Material-UIのコンポーネントをインポートしています。
import HomeIcon from "@mui/icons-material/Home"; // ホームアイコンをインポートしています。
import SearchIcon from "@mui/icons-material/Search"; // 検索アイコンをインポートしています。
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // カレンダーアイコンをインポートしています。
import TaskIcon from "@mui/icons-material/Task"; // タスクアイコンをインポートしています。
import BuildIcon from "@mui/icons-material/Build"; // タスクアイコンをインポートしています。
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。

// Footerコンポーネントを定義しています。
// このコンポーネントはページの下部に固定されて表示され、ナビゲーションボタンを含みます。
export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed", // フッターをページの下部に固定
        bottom: 0,
        width: "100%",
        zIndex: 1000, // 他のコンテンツの上に表示するためのZインデックス
        backgroundColor: "var(--bg-color)", // 背景色をCSS変数で制御（テーマに応じて変化）
        padding: "0.1rem 0", // フッターの高さを狭くするためのパディング調整
      }}
    >
      <Grid container spacing={0}>
        {/* ホームボタン */}
        <Grid item xs={3}>
          <Link href="/" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column", // アイコンとテキストを縦に配置
                width: "100%",
                padding: "0.2rem 0", // ボタンの高さを調整
                minHeight: "40px", // 最小高さを設定
                color: "var(--icon-color)", // アイコンとテキストの色をCSS変数で制御
              }}
            >
              <HomeIcon className="icon" /> {/* ホームアイコンを表示 */}
              <div style={{ fontSize: "0.75rem" }}>Home</div>{" "}
              {/* ボタンラベルを表示 */}
            </Button>
          </Link>
        </Grid>

        {/* カレンダーボタン */}
        <Grid item xs={3}>
          <Link href="/table" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0",
                minHeight: "50px",
                color: "var(--icon-color)",
              }}
            >
              <PhotoLibraryIcon className="icon" />{" "}
              {/* カレンダーアイコンを表示 */}
              <div style={{ fontSize: "0.75rem" }}>アルバム</div>{" "}
              {/* ボタンラベルを表示 */}
            </Button>
          </Link>
        </Grid>

        {/* タスクボタン */}
        <Grid item xs={3}>
          <Link href="/tasks" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0",
                minHeight: "50px",
                color: "var(--icon-color)",
              }}
            >
              <TaskIcon className="icon" /> {/* タスクアイコンを表示 */}
              <div style={{ fontSize: "0.75rem" }}>やること</div>{" "}
              {/* ボタンラベルを表示 */}
            </Button>
          </Link>
        </Grid>
        {/* 開発中のボタン */}
        <Grid item xs={3}>
          <Link href="/management" prefetch={false}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0.2rem 0",
                minHeight: "50px",
                color: "var(--icon-color)",
              }}
            >
              <BuildIcon className="icon" /> {/* タスクアイコンを表示 */}
              <div style={{ fontSize: "0.75rem" }}>開発中</div>{" "}
              {/* ボタンラベルを表示 */}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

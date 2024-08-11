"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import { Button, Divider } from "@mui/material";
import { IconButton, Box, Typography } from "@mui/material"; // MUIのコンポーネントをインポート。
import Pets from "@mui/icons-material/Pets"; // ペットアイコンをインポート

export default function UserManagementPage() {
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。

  // アイコンボタンのスタイルを定義
  const iconButtonStyle = {
    minWidth: "40px", // ボタンの最小幅を設定
    height: "36px", // ボタンの高さを設定
    display: "flex", // フレックスボックスを使用して要素を配置
    alignItems: "center", // ボタン内の要素を中央揃え
    justifyContent: "center", // ボタン内の要素を中央揃え
    padding: "0 16px", // ボタンの左右に余白を設定
    lineHeight: "1", // テキストの行間を設定
    textAlign: "center", // テキストを中央揃え
    color: "var(--icon-color)", // アイコンの色をCSS変数で制御
  };

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // 現在のテーマに応じてテーマを切り替えます。
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div style={{ paddingTop: "60px" }}></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          管理画面
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "16px" }} />

        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/test_component" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              開発中（Flaskとの接続）
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/supabase_component" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              開発中（Supabaseとの接続）
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/get_dog_image" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              開発中（わんこの画像を取得できる機能）
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/get_dog_image" prefetch={false}>
            <IconButton sx={iconButtonStyle}>
              <Pets />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <Footer theme={theme} />
    </>
  );
}

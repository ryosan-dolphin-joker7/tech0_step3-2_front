"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import { Box, Typography, Button, Divider } from "@mui/material";

export default function UserManagementPage() {
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。

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
          <Link href="/management/users" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              ユーザー管理
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/users" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              ペット管理
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/users" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              ペット用品管理
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "100%", padding: "16px" }}>
          <Link href="/users" passHref>
            <Button
              sx={{
                width: "100%",
                border: "0",
                backgroundColor: "skyblue",
                ":hover": { color: "white" },
              }}
            >
              サービスレベル
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer theme={theme} />
    </>
  );
}

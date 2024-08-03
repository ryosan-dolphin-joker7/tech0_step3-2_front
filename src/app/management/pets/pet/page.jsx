"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState, useRef } from "react";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import { TextField, Button, Box, Typography } from "@mui/material";

export default function UserRegistrationPage() {
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
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          ペット名
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="ワンコ　甲号"
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography variant="h6" gutterBottom>
          生年月日
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="2022年2月22日"
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography variant="h6" gutterBottom>
          性別
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="オス"
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography variant="h6" gutterBottom>
          犬種
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="ポメラニアン"
          InputProps={{
            readOnly: true,
          }}
        />

        <Button variant="contained" color="primary" sx={{ marginTop: "16px" }}>
          新しいペットを登録
        </Button>
        <Link href="/management" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            戻る
          </Button>
        </Link>
      </Box>
      <Footer theme={theme} />
    </>
  );
}

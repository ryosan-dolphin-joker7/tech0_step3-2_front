"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState, useRef } from "react";
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
          ユーザ名
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="実家　真守"
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
          defaultValue="2000年11月11日"
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography variant="h6" gutterBottom>
          ユーザID（メールアドレス）
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          defaultValue="ussr1922@greatmail.com"
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography variant="h6" gutterBottom>
          パスワード
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type="password"
          defaultValue="****************"
          InputProps={{
            readOnly: true,
          }}
        />

        <Button variant="contained" color="primary" sx={{ marginTop: "16px" }}>
          新しいユーザを登録
        </Button>
      </Box>
      <Footer theme={theme} />
    </>
  );
}

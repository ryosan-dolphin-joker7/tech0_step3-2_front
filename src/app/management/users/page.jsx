"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";

export default function UserManagementPage() {
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // 現在のテーマに応じてテーマを切り替えます。
  };

  const users = [
    { name: "越智 梨子" },
    { name: "越智 太郎" },
    { name: "越智 舞依" },
    { name: "越智 太志" },
  ];

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
          ユーザ管理
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "16px" }} />

        <List sx={{ width: "100%" }}>
          {users.map((user, index) => (
            <ListItem
              key={index}
              sx={{
                padding: "12px",
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                borderRadius: "4px",
                marginBottom: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              {user.name}
            </ListItem>
          ))}
        </List>
        <Link href="/management/users/user" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            + 新規登録
          </Button>
        </Link>
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

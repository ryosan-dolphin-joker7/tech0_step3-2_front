"use client"; // クライアント側で動作するコードであることを指定しています。
import { Button, ButtonGroup } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポートしています。
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポートしています。

export default function Header({ theme, toggleTheme }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button>メニューアイコン</Button>
        <Button>アラーム</Button>
        <Button>設定</Button>
        <Button>アカウント</Button>
        <Button
          variant="outlined"
          aria-label="toggle theme"
          onClick={toggleTheme}
          startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        >
          {theme === "light" ? "" : ""}
        </Button>
      </ButtonGroup>
    </div>
  );
}

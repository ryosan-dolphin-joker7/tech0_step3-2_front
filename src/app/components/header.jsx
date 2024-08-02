"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { Button, ButtonGroup } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポートしています。
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポートしています。
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AlarmIcon from "@mui/icons-material/Alarm";
import TestIcon from "@mui/icons-material/Build"; // テスト用の適当なアイコンをインポートしています

export default function Header({ theme, toggleTheme }) {
  const iconButtonStyle = {
    minWidth: "40px",
    height: "36px", // ボタンの高さを36pxに設定
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px", // 横のパディングを調整
    lineHeight: "1", // lineHeightを設定して中央揃えを確実に
    textAlign: "center", // テキストの中央揃え
  };

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
        <Button variant="outlined" style={iconButtonStyle}>
          <MenuIcon />
        </Button>
        <Button variant="outlined" style={iconButtonStyle}>
          <AlarmIcon />
        </Button>
        <Link href="/supabase_component" prefetch={false}>
          <Button variant="outlined" style={iconButtonStyle}>
            <TestIcon />
          </Button>
        </Link>
        <Link href="/supabase_component" prefetch={false}>
          <Button variant="outlined" style={iconButtonStyle}>
            <AccountCircleIcon />
          </Button>
        </Link>
        <Button
          variant="outlined"
          aria-label="toggle theme"
          onClick={toggleTheme}
          style={iconButtonStyle}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </ButtonGroup>
    </div>
  );
}

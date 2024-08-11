"use client"; // クライアントサイドで動作するコードであることを指定。
import Link from "next/link"; // ページリンクを作成するためのコンポーネントをインポート。
import { IconButton, Box, Typography } from "@mui/material"; // MUIのコンポーネントをインポート。
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポート。
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポート。
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // アカウントアイコンをインポート。
import MenuIcon from "@mui/icons-material/Menu"; // メニューアイコンをインポート
import Pets from "@mui/icons-material/Pets"; // ペットアイコンをインポート

export default function Header({ theme, toggleTheme }) {
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

  // 今日の日付を取得し、YYYY-MM-DD形式にフォーマットする
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box
      sx={{
        position: "fixed", // ヘッダーを画面の上部に固定
        top: 0, // ヘッダーを画面の最上部に配置
        width: "100%", // ヘッダーの幅を100%に設定（画面全体に広がる）
        zIndex: 1000, // ヘッダーが他の要素よりも前面に表示されるように設定
        backgroundColor: "var(--bg-color)", // 背景色をCSS変数で制御
        display: "flex", // フレックスボックスを使用して要素を配置
        alignItems: "center", // 要素を縦方向に中央揃え
        justifyContent: "space-between", // 要素を左右に配置し、中央にスペースを確保
        padding: "0 16px", // ヘッダーの左右に余白を設定
      }}
    >
      {/* 左側（メニューアイコン） */}
      <IconButton sx={iconButtonStyle}>
        <MenuIcon />
      </IconButton>

      {/* 中央に今日の日付を表示 */}
      <Typography variant="body1" color="textPrimary">
        {today}
      </Typography>

      {/* 右側（通知アイコン、アカウントアイコン、テーマ切り替えアイコン） */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/get_dog_image" prefetch={false}>
          <IconButton sx={iconButtonStyle}>
            <Pets />
          </IconButton>
        </Link>
        <Link href="/management" prefetch={false}>
          <IconButton sx={iconButtonStyle}>
            <AccountCircleIcon />
          </IconButton>
        </Link>
        {/* テーマ切り替えボタン */}
        <IconButton
          sx={iconButtonStyle}
          onClick={toggleTheme} // テーマを切り替える関数を呼び出す
          aria-label="toggle theme" // アクセシビリティのためのラベル
        >
          {/* 現在のテーマに応じて、ダークモードとライトモードのアイコンを切り替える */}
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}

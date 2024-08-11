"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useContext, useState } from "react"; // Reactのフックをインポート
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { ThemeContext } from "@/components/ThemeProvider"; // テーマの状態を管理するコンテキストをインポート
import { IconButton, Box, Typography, Menu, MenuItem } from "@mui/material"; // MUI（Material-UI）のコンポーネントをインポート
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポート
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポート
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // アカウントアイコンをインポート
import MenuIcon from "@mui/icons-material/Menu"; // メニューアイコンをインポート
import AccountModal from "@/components/AccountModal"; // モーダルウィンドウを管理するコンポーネントをインポート

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); // テーマの状態（light/dark）とテーマ切り替え関数をコンテキストから取得

  const [anchorEl, setAnchorEl] = useState(null); // メニューの開閉を管理するためのアンカー要素を保持
  const [modalOpen, setModalOpen] = useState(false); // モーダルウィンドウの開閉状態を管理
  const [selectedAccount, setSelectedAccount] = useState(null); // 選択されたアカウントIDを保持する状態

  // メニューを開くときに呼び出される関数。クリックされた位置をアンカー要素として設定
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // メニューを開くためにアンカー要素を設定
  };

  // メニューを閉じるときに呼び出される関数
  const handleMenuClose = () => {
    setAnchorEl(null); // メニューを閉じるときにアンカー要素をリセット
  };

  // モーダルウィンドウを開くときに呼び出される関数
  const handleModalOpen = () => {
    setModalOpen(true); // モーダルウィンドウを開く
  };

  // モーダルウィンドウを閉じるときに呼び出される関数
  const handleModalClose = () => {
    setModalOpen(false); // モーダルウィンドウを閉じる
  };

  // アイコンボタンのスタイルを定義。すべてのアイコンボタンで共通のスタイルを使用
  const iconButtonStyle = {
    minWidth: "40px", // ボタンの最小幅を設定
    height: "36px", // ボタンの高さを設定
    display: "flex", // フレックスボックスを使用して中身を配置
    alignItems: "center", // ボタン内の要素を縦方向に中央揃え
    justifyContent: "center", // ボタン内の要素を横方向に中央揃え
    padding: "0 16px", // ボタンの左右に余白を設定
    lineHeight: "1", // 行間を設定
    textAlign: "center", // テキストを中央揃え
    color: "var(--icon-color)", // アイコンの色をCSS変数で制御
  };

  const today = new Date().toISOString().split("T")[0]; // 今日の日付を取得し、YYYY-MM-DD形式にフォーマット

  return (
    <Box
      sx={{
        position: "fixed", // ヘッダーを画面の上部に固定
        top: 0, // 画面の最上部に配置
        width: "100%", // ヘッダーの幅を100%に設定（画面全体に広がる）
        zIndex: 1000, // ヘッダーが他の要素よりも前面に表示されるように設定
        backgroundColor: "var(--bg-color)", // 背景色をCSS変数で制御
        display: "flex", // フレックスボックスを使用して要素を配置
        alignItems: "center", // 要素を縦方向に中央揃え
        justifyContent: "space-between", // 要素を左右に配置し、中央にスペースを確保
        padding: "0 16px", // ヘッダーの左右に余白を設定
      }}
    >
      {/* 左側にメニューアイコンを表示 */}
      <IconButton sx={iconButtonStyle} onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      {/* メニューアイコンがクリックされたときに表示されるプルダウンメニュー */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link href="/" passHref>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/users" passHref>
            Users
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/pets" passHref>
            Pets
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/facilities" passHref>
            Facilities
          </Link>
        </MenuItem>
      </Menu>

      {/* 中央に今日の日付を表示 */}
      <Typography variant="body1" color="textPrimary">
        {today}
      </Typography>

      {/* 右側にアカウントアイコン、アカウントID、テーマ切り替えアイコンを表示 */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={iconButtonStyle} onClick={handleModalOpen}>
          <AccountCircleIcon />
        </IconButton>
        {/* 選択されたアカウントIDを表示。選択されたアカウントがある場合のみ表示 */}
        {selectedAccount && (
          <Typography
            variant="body1"
            color="textPrimary"
            sx={{ marginLeft: "8px" }}
          >
            {`ID: ${selectedAccount}`}
          </Typography>
        )}
        {/* モーダルウィンドウを表示。選択されたアカウントIDを更新する関数を渡す */}
        <AccountModal
          open={modalOpen}
          handleClose={handleModalClose}
          setSelectedAccount={setSelectedAccount}
        />
        <IconButton
          sx={iconButtonStyle}
          onClick={toggleTheme}
          aria-label="toggle theme"
        >
          {/* 現在のテーマに応じて、ダークモードとライトモードのアイコンを切り替える */}
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}

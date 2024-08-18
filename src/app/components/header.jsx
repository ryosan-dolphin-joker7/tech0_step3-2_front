"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link"; // ルーティング用のリンクコンポーネントをインポート
import { ThemeContext } from "@/app/components/ThemeProvider"; // テーマのコンテキストをインポート
import { AccountContext } from "@/app/components/AccountProvider"; // アカウントのコンテキストをインポート
import AccountModal from "@/app/components/AccountModal"; // アカウントモーダルをインポート
import { useSession, signOut } from "next-auth/react"; // 認証用フックとサインアウト機能をインポート

import { IconButton, Box, Typography, Menu, MenuItem } from "@mui/material"; // UIコンポーネントをインポート
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポート
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポート
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // アカウントアイコンをインポート
import MenuIcon from "@mui/icons-material/Menu"; // メニューアイコンをインポート
import LogoutIcon from "@mui/icons-material/Logout"; // ログアウトアイコンをインポート

export default function Header() {
  // テーマとテーマ切り替え関数を取得
  const { theme, toggleTheme } = useContext(ThemeContext);
  // 選択されたアカウントとアカウント選択関数を取得
  const { selectedAccount, setSelectedAccount } = useContext(AccountContext);
  // 認証ステータスを取得
  const { status } = useSession();

  // メニューのアンカー要素とモーダルの状態を管理するためのステート
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // 今日の日付を管理するためのステート
  const [today, setToday] = useState("");

  // コンポーネントの初回レンダリング時に今日の日付を取得
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  // メニューを開くハンドラー
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // メニューを閉じるハンドラー
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // モーダルを開くハンドラー
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // モーダルを閉じるハンドラー
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // アイコンボタンのスタイル定義
  const iconButtonStyle = {
    minWidth: "40px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px",
    lineHeight: "1",
    textAlign: "center",
    color: "var(--icon-color)", // アイコンの色はカスタムCSS変数から取得
  };

  return (
    <Box
      sx={{
        position: "fixed", // ヘッダーを固定表示
        top: 0, // 画面の上部に固定
        width: "100%", // ヘッダーを画面全幅に広げる
        zIndex: 1000, // 他のコンテンツよりも前面に表示
        backgroundColor: "var(--bg-color)", // 背景色はカスタムCSS変数から取得
        display: "flex", // 横並びレイアウト
        alignItems: "center", // 縦方向の中央揃え
        justifyContent: "space-between", // 子要素を左右に配置
        padding: "0 16px", // 左右にパディングを設定
      }}
    >
      {/* 左側にメニューアイコンを表示。クリックでメニューを開く */}
      <IconButton sx={iconButtonStyle} onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>

      {/* メニューアイコンがクリックされたときに表示されるプルダウンメニュー */}
      <Menu
        anchorEl={anchorEl} // メニューの表示位置を指定
        open={Boolean(anchorEl)} // メニューを開くかどうかを制御
        onClose={handleMenuClose} // メニューを閉じるハンドラーを設定
      >
        {/* 各メニュー項目をクリックするとメニューを閉じ、指定されたページに移動 */}
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
        {today || "Loading..."} {/* 日付が取得されるまで「Loading...」と表示 */}
      </Typography>

      {/* 右側にアカウントアイコン、テーマ切り替えアイコン、ログアウトアイコンを表示 */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* アカウントアイコンを表示。クリックでモーダルを開く */}
        <IconButton sx={iconButtonStyle} onClick={handleModalOpen}>
          <AccountCircleIcon />
        </IconButton>

        {/* アカウントモーダルを表示 */}
        <AccountModal
          open={modalOpen} // モーダルの開閉状態を制御
          handleClose={handleModalClose} // モーダルを閉じるハンドラーを設定
          setSelectedAccount={setSelectedAccount} // 選択されたアカウントを更新
        />

        {/* テーマ切り替えアイコン */}
        <IconButton
          sx={iconButtonStyle}
          onClick={toggleTheme} // テーマ切り替え関数を呼び出す
          aria-label="toggle theme" // アクセシビリティ用のラベルを設定
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          {/* 現在のテーマに応じてアイコンを切り替え */}
        </IconButton>

        {/* ログインしている場合にのみログアウトアイコンを表示 */}
        {status === "authenticated" && (
          <IconButton
            sx={iconButtonStyle}
            aria-label="logout" // アクセシビリティ用のラベルを設定
            onClick={() => signOut()} // サインアウト関数を直接呼び出す
          >
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

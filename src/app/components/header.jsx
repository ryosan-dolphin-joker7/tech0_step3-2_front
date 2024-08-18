"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useContext, useState, useEffect } from "react"; // Reactのフックをインポート
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { ThemeContext } from "@/app/components/ThemeProvider"; // テーマの状態を管理するコンテキストをインポート
import { AccountContext } from "@/app/components/AccountProvider"; // アカウントの状態を管理するコンテキストをインポート
import AccountModal from "@/app/components/AccountModal"; // モーダルウィンドウを管理するコンポーネントをインポート

// アイコンをインポート
import { IconButton, Box, Typography, Menu, MenuItem } from "@mui/material"; // MUI（Material-UI）のコンポーネントをインポート
import DarkModeIcon from "@mui/icons-material/DarkMode"; // ダークモードアイコンをインポート
import LightModeIcon from "@mui/icons-material/LightMode"; // ライトモードアイコンをインポート
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // アカウントアイコンをインポート
import MenuIcon from "@mui/icons-material/Menu"; // メニューアイコンをインポート

// Headerコンポーネントを定義
// このコンポーネントは、アプリの上部に表示されるナビゲーションバーを作成します
export default function Header() {
  // テーマの状態（light/dark）とテーマ切り替え関数を、ThemeProviderから取得
  const { theme, toggleTheme } = useContext(ThemeContext);

  // AccountContextからselectedAccountとsetSelectedAccountを取得
  const { selectedAccount, setSelectedAccount } = useContext(AccountContext);

  // メニューを開くためのアンカー要素と、その状態を管理するためのuseStateフック
  const [anchorEl, setAnchorEl] = useState(null);

  // モーダルウィンドウの開閉状態を管理するためのuseStateフック
  const [modalOpen, setModalOpen] = useState(false);

  // 今日の日付を保存するためのuseStateフック
  // 初期値として現在の日付を設定しておくことで、初期レンダリング時に日付が表示される
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);

  // useEffectフックを使用して、コンポーネントがクライアントサイドで表示されたときに日付を再設定
  useEffect(() => {
    // クライアントサイドでのみ、現在の日付を取得して再設定
    setToday(new Date().toISOString().split("T")[0]);
  }, []); // 依存配列が空なので、コンポーネントの最初のレンダリング時にのみ実行されます

  // メニューを開くときに呼び出される関数。クリックされた位置をアンカー要素として設定
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // メニューを開くためにクリックされた要素をアンカーに設定
  };

  // メニューを閉じるときに呼び出される関数
  const handleMenuClose = () => {
    setAnchorEl(null); // メニューを閉じるためにアンカー要素をリセット
  };

  // モーダルウィンドウを開くときに呼び出される関数
  const handleModalOpen = () => {
    setModalOpen(true); // モーダルウィンドウを開くために状態をtrueに設定
  };

  // モーダルウィンドウを閉じるときに呼び出される関数
  const handleModalClose = () => {
    setModalOpen(false); // モーダルウィンドウを閉じるために状態をfalseに設定
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
      {/* 左側にメニューアイコンを表示。クリックでメニューを開く */}
      <IconButton sx={iconButtonStyle} onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      {/* メニューアイコンがクリックされたときに表示されるプルダウンメニュー */}
      <Menu
        anchorEl={anchorEl} // メニューの表示位置を設定
        open={Boolean(anchorEl)} // メニューが開かれているかどうかを状態に基づいて設定
        onClose={handleMenuClose} // メニューが閉じられるときに呼び出される関数
      >
        {/* 各メニューアイテムにリンクを設定 */}
        <MenuItem onClick={handleMenuClose}>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/users" passHref>
            <a>Users</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/pets" passHref>
            <a>Pets</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/management/facilities" passHref>
            <a>Facilities</a>
          </Link>
        </MenuItem>
      </Menu>

      {/* 中央に今日の日付を表示 */}
      <Typography variant="body1" color="textPrimary">
        {/* クライアントサイドで設定された日付を表示。まだ設定されていない場合は "Loading..." を表示 */}
        {today || "Loading..."}
      </Typography>

      {/* 右側にアカウントアイコン、アカウントID、テーマ切り替えアイコンを表示 */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* アカウントアイコンを表示。クリックでモーダルを開く */}
        <IconButton sx={iconButtonStyle} onClick={handleModalOpen}>
          <AccountCircleIcon />
        </IconButton>

        {/* モーダルウィンドウを表示。選択されたアカウントIDを更新する関数を渡す */}
        <AccountModal
          open={modalOpen} // モーダルの開閉状態を制御
          handleClose={handleModalClose} // モーダルを閉じる関数を渡す
          setSelectedAccount={setSelectedAccount} // モーダルで選択されたアカウントIDを更新
        />
        {/* テーマ切り替えアイコンを表示。クリックでテーマを切り替え */}
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

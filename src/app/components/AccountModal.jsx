import React, { useState, useContext } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeContext } from "./ThemeProvider"; // テーマコンテキストをインポート

const style = {
  position: "absolute", // モーダルウィンドウを画面中央に配置
  top: "50%", // 画面の縦中央に配置
  left: "50%", // 画面の横中央に配置
  transform: "translate(-50%, -50%)", // 配置を画面中央に調整
  width: 300, // モーダルウィンドウの幅を300pxに設定
  bgcolor: "background.paper", // テーマに基づいた背景色
  border: "2px solid #000", // モーダルウィンドウの境界線
  boxShadow: 24, // モーダルウィンドウに影をつける
  p: 4, // 内側の余白を設定
};

export default function AccountModal({
  open,
  handleClose,
  setSelectedAccount,
}) {
  const { theme } = useContext(ThemeContext); // テーマの状態をコンテキストから取得
  const muiTheme = useTheme(); // MUIのテーマを取得

  // アカウントが選択されたときに呼び出される関数
  const handleAccountSelect = (id) => {
    setSelectedAccount(id); // ヘッダーコンポーネントの`selectedAccount`状態を更新
    handleClose(); // モーダルを閉じる
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="account-modal-title"
      aria-describedby="account-modal-description"
    >
      <Box sx={style}>
        {/* モーダルのタイトル */}
        <Typography
          id="account-modal-title"
          variant="h6"
          component="h2"
          color={
            muiTheme.palette.mode === "light" ? "textPrimary" : "textSecondary"
          }
        >
          Select an Account
        </Typography>
        {/* モーダルの説明文 */}
        <Typography
          id="account-modal-description"
          variant="body1"
          mt={2}
          color={
            muiTheme.palette.mode === "light" ? "textPrimary" : "textSecondary"
          }
        >
          ログインするには、次のいずれかのアカウントを選択してください:
        </Typography>
        {/* アカウント1を選択するボタン */}
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAccountSelect(1)}
          >
            Account 1
          </Button>
        </Box>
        {/* アカウント2を選択するボタン */}
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAccountSelect(2)}
          >
            Account 2
          </Button>
        </Box>
        {/* アカウント3を選択するボタン */}
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAccountSelect(3)}
          >
            Account 3
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

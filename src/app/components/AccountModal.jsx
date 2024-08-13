import React, { useContext } from "react"; // Reactと必要なフックをインポート
import { Modal, Box, Typography, Button } from "@mui/material"; // MUIからモーダルやボタンなどのコンポーネントをインポート
import { useTheme } from "@mui/material/styles"; // MUIのテーマを使うためのフックをインポート
import { AccountContext } from "./AccountProvider"; // アカウントコンテキストをインポート

// モーダルのスタイルを定義するオブジェクト
const modalStyle = {
  position: "absolute", // モーダルを画面中央に配置
  top: "50%", // 画面の縦中央に配置
  left: "50%", // 画面の横中央に配置
  transform: "translate(-50%, -50%)", // 配置を画面中央に調整
  width: 300, // モーダルウィンドウの幅を300pxに設定
  bgcolor: "background.paper", // テーマに基づいた背景色を適用
  border: "2px solid #000", // モーダルウィンドウに黒い境界線を設定
  boxShadow: 24, // モーダルウィンドウに影をつける
  p: 4, // モーダルウィンドウ内の余白を設定
};

// AccountModalコンポーネントを定義
export default function AccountModal({ open, handleClose }) {
  const muiTheme = useTheme(); // MUIのテーマ設定を取得
  const { setSelectedAccount } = useContext(AccountContext); // アカウント選択関数を取得

  // アカウントが選択されたときに呼び出される関数
  const handleAccountSelect = (id) => {
    setSelectedAccount(id); // 選択されたアカウントのIDをグローバル状態に設定
    handleClose(); // モーダルを閉じる
  };

  // アカウント選択ボタンを生成する関数を定義
  const renderAccountButton = (id, name) => (
    <Box mt={2} key={id}>
      <Button
        fullWidth // ボタンを横幅いっぱいに設定
        variant="contained" // ボタンのスタイルを設定
        sx={{
          backgroundColor: muiTheme.palette.primary.dark, // ボタンの背景色をプライマリカラーのダークに設定
          color: muiTheme.palette.primary.contrastText, // ボタンのテキストカラーを設定
          "&:hover": {
            backgroundColor: muiTheme.palette.primary.dark, // ホバー時も同じ背景色を維持
          },
        }}
        onClick={() => handleAccountSelect(id)} // ボタンがクリックされたときにアカウントを選択
      >
        {name}
      </Button>
    </Box>
  );

  // モーダルウィンドウの描画内容を定義
  return (
    <Modal
      open={open} // モーダルが開いているかどうかを指定
      onClose={handleClose} // モーダルを閉じるためのイベントハンドラーを指定
      aria-labelledby="account-modal-title" // アクセシビリティのためにタイトルを指定
      aria-describedby="account-modal-description" // アクセシビリティのために説明文を指定
      role="dialog" // アクセシビリティのためにダイアログロールを指定
    >
      <Box sx={modalStyle}>
        <Typography
          id="account-modal-title" // タイトルのIDを設定
          variant="h6" // タイトルのスタイルを設定（h6レベル）
          component="h2" // タイトルのHTMLタグをh2に設定
        >
          アカウントを選択
        </Typography>
        <Typography
          id="account-modal-description" // 説明文のIDを設定
          variant="body1" // 説明文のスタイルを設定
          mt={2} // 説明文の上にマージン（余白）を設定
        >
          ログインするアカウントを選んでください:
        </Typography>
        {renderAccountButton(1, "アカウント 1")}
        {renderAccountButton(2, "アカウント 2")}
        {renderAccountButton(3, "アカウント 3")}
      </Box>
    </Modal>
  );
}

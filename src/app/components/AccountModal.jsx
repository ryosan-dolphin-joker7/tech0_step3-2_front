import React, { useContext } from "react"; // Reactと必要なフックをインポート
import { Modal, Box, Typography, Button } from "@mui/material"; // MUIからモーダルやボタンなどのコンポーネントをインポート
import { useTheme } from "@mui/material/styles"; // MUIのテーマを使うためのフックをインポート
import { ThemeContext } from "./ThemeProvider"; // テーマコンテキストをインポート
import { AccountContext } from "./AccountProvider"; // アカウントコンテキストをインポート

// モーダルのスタイルを定義するオブジェクト
const style = {
  position: "absolute", // モーダルウィンドウを画面中央に配置
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
  const { theme } = useContext(ThemeContext); // テーマの状態をコンテキストから取得
  const muiTheme = useTheme(); // MUIのテーマ設定を取得
  const { setSelectedAccount } = useContext(AccountContext); // アカウントコンテキストからsetSelectedAccountを取得

  // アカウントが選択されたときに呼び出される関数
  const handleAccountSelect = (id) => {
    setSelectedAccount(id); // 選択されたアカウントのIDをグローバル状態に設定
    handleClose(); // モーダルを閉じる
  };

  // モーダルウィンドウの描画内容を定義
  return (
    <Modal
      open={open} // モーダルが開いているかどうかを設定
      onClose={handleClose} // モーダルを閉じるためのイベントハンドラーを設定
      aria-labelledby="account-modal-title" // アクセシビリティのためにタイトルを指定
      aria-describedby="account-modal-description" // アクセシビリティのために説明文を指定
    >
      <Box sx={style}>
        {/* モーダルのスタイルを適用 */}
        {/* モーダルのタイトルを表示 */}
        <Typography
          id="account-modal-title" // タイトルのIDを設定
          variant="h6" // タイトルのスタイルを設定（h6レベル）
          component="h2" // タイトルのHTMLタグをh2に設定
          color={
            muiTheme.palette.mode === "light" ? "textPrimary" : "textSecondary"
          } // テーマに基づいてタイトルの文字色を設定
        >
          Select an Account
        </Typography>
        {/* モーダルの説明文を表示 */}
        <Typography
          id="account-modal-description" // 説明文のIDを設定
          variant="body1" // 説明文のスタイルを設定
          mt={2} // 説明文の上にマージン（余白）を設定
          color={
            muiTheme.palette.mode === "light" ? "textPrimary" : "textSecondary"
          } // テーマに基づいて説明文の文字色を設定
        >
          ログインするには、次のいずれかのアカウントを選択してください:
        </Typography>
        {/* アカウント1を選択するボタン */}
        <Box mt={2}>
          {/* ボタンの上にマージン（余白）を設定 */}
          <Button
            fullWidth // ボタンを横幅いっぱいに設定
            variant="contained" // ボタンのスタイルを設定
            onClick={() => handleAccountSelect(1)} // ボタンがクリックされたときにアカウント1を選択
          >
            Account 1
          </Button>
        </Box>
        {/* アカウント2を選択するボタン */}
        <Box mt={2}>
          {/* ボタンの上にマージン（余白）を設定 */}
          <Button
            fullWidth // ボタンを横幅いっぱいに設定
            variant="contained" // ボタンのスタイルを設定
            onClick={() => handleAccountSelect(2)} // ボタンがクリックされたときにアカウント2を選択
          >
            Account 2
          </Button>
        </Box>
        {/* アカウント3を選択するボタン */}
        <Box mt={2}>
          {/* ボタンの上にマージン（余白）を設定 */}
          <Button
            fullWidth // ボタンを横幅いっぱいに設定
            variant="contained" // ボタンのスタイルを設定
            onClick={() => handleAccountSelect(3)} // ボタンがクリックされたときにアカウント3を選択
          >
            Account 3
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

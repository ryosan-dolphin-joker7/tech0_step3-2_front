// components/Modal.js

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

// モーダルコンポーネント
const TodoModal = ({ isOpen, onClose, todoDetails }) => {
  // MUIのスタイル設定
  const style = {
    position: "absolute", // モーダルを画面上に絶対配置
    top: "50%", // 縦方向の中央に配置
    left: "50%", // 横方向の中央に配置
    transform: "translate(-50%, -50%)", // モーダルの中心を基準に位置を調整
    width: 400, // モーダルの幅を設定
    bgcolor: "background.paper", // 背景色をテーマのペーパーカラーに設定
    border: "2px solid #000", // ボーダーを設定
    boxShadow: 24, // ボックスシャドウを設定
    p: 4, // パディングを設定
    borderRadius: "8px", // 角を丸くする
  };

  return (
    <Modal
      open={isOpen} // モーダルの開閉状態
      onClose={onClose} // モーダルを閉じる関数
      aria-labelledby="modal-title" // モーダルのタイトルにアクセス可能なラベルを設定
      aria-describedby="modal-description" // モーダルの説明にアクセス可能なラベルを設定
    >
      <Box sx={style} onClick={(e) => e.stopPropagation()}>
        {todoDetails ? (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              <strong>{todoDetails.title}</strong>
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>詳細:</strong> {todoDetails.contents}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>いつまでにやるか:</strong> {todoDetails.end_date}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>完了状態:</strong> {todoDetails.state ? "完了" : "未完了"}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2 }}>タスクの詳細が見つかりません。</Typography>
        )}
        <Button
          onClick={onClose} // モーダルを閉じる処理
          variant="contained" // ボタンのバリアント（スタイル）を設定
          sx={{ mt: 3 }} // 上部にマージンを追加
        >
          閉じる
        </Button>
      </Box>
    </Modal>
  );
};

export default TodoModal; // TodoModalコンポーネントをエクスポートして他のファイルから使用可能にする

import React, { useState, useEffect, useContext } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Modal, Box, Typography, Button } from "@mui/material"; // MUIからモーダルやボタンなどのコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート
import { useSession } from "next-auth/react"; // 認証用フックをインポート
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポート

// モーダルのスタイルを定義するオブジェクト
const modalStyle = {
  position: "absolute", // モーダルを画面中央に配置
  top: "50%", // 画面の縦中央に配置
  left: "50%", // 画面の横中央に配置
  transform: "translate(-50%, -50%)", // 配置を画面中央に調整
  width: 300, // モーダルウィンドウの幅を300pxに設定
  bgcolor: "background.paper", // 背景色を白に設定
  border: "2px solid #000", // モーダルウィンドウに黒い境界線を設定
  boxShadow: 24, // モーダルウィンドウに影をつける
  p: 4, // モーダルウィンドウ内の余白を設定
};

// AccountModalコンポーネントを定義
export default function AccountModal({ open, handleClose }) {
  const { data: session } = useSession(); // 認証ステータスとセッションデータを取得
  const { setSelectedAccount, setSelectedUserAccount } =
    useContext(AccountContext); // ファミリーとユーザーのアカウント選択関数を取得
  const [users, setUsers] = useState([]); // ユーザーデータを保存する状態を追加

  // Supabaseからuserinformationテーブルのデータをfamily_idでフィルタして取得する非同期関数
  const fetchData = async () => {
    try {
      if (!session?.family_id) return; // sessionまたはfamily_idがない場合は処理を終了

      const { data: usersData, error: usersError } = await supabase
        .from("userinformation")
        .select("*")
        .eq("family_id", session.family_id); // family_idでフィルタリング

      if (usersError) throw usersError; // エラーが発生した場合は例外をスロー

      const sortedUsers = usersData.sort((a, b) => a.userid - b.userid); // useridの順にデータをソート

      setUsers(sortedUsers || []); // ソート後のデータをusers状態に保存
    } catch (error) {
      console.error("アカウント情報の取得に失敗しました: " + error.message); // エラーメッセージをコンソールに出力
    }
  };

  useEffect(() => {
    fetchData(); // データ取得関数を実行
  }, [session?.family_id]); // family_idが変更されたときに再度データを取得

  const handleAccountSelect = (user) => {
    setSelectedAccount(user.family_id); // 選択されたアカウントのIDをグローバル状態に設定
    setSelectedUserAccount(user.userid); // 選択されたユーザーのIDをグローバル状態に設定
    handleClose(); // モーダルを閉じる
  };

  const renderAccountButtons = () => {
    return users.map((user) => (
      <Box mt={2} key={user.userid}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#e66a63 !important",
            color: "#fff !important",
            "&:hover": {
              backgroundColor: "#1565c0 !important",
              border: "1px solid #fff",
            },
          }}
          onClick={() => handleAccountSelect(user)}
        >
          {user.user_name}
        </Button>
      </Box>
    ));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="account-modal-title"
      aria-describedby="account-modal-description"
      role="dialog"
    >
      <Box sx={modalStyle}>
        <Typography id="account-modal-title" variant="h6" component="h2">
          アカウントを選択
        </Typography>
        <Typography id="account-modal-description" variant="body1" mt={2}>
          ログインするアカウントを選んでください:
        </Typography>
        {renderAccountButtons()}
      </Box>
    </Modal>
  );
}

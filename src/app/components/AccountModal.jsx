import React, { useState, useEffect, useContext } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Modal, Box, Typography, Button } from "@mui/material"; // MUIからモーダルやボタンなどのコンポーネントをインポート
import { AccountContext } from "@/app/components/AccountProvider"; // アカウントコンテキストをインポート
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
  // ファミリーとユーザーのアカウント選択関数を取得
  const { setSelectedAccount, setSelectedUserAccount } =
    useContext(AccountContext);
  const [users, setUsers] = useState([]); // ユーザーデータを保存する状態を追加

  // Supabaseからuserinformationテーブルのすべてのデータを取得する非同期関数
  const fetchData = async () => {
    try {
      // Supabaseからuserinformationテーブルのデータを取得
      const { data: usersData, error: usersError } = await supabase
        .from("userinformation")
        .select("*"); // 全てのカラムを選択して取得

      if (usersError) throw usersError; // エラーが発生した場合は例外をスローします

      // useridの順にデータをソート
      const sortedUsers = usersData.sort((a, b) => a.userid - b.userid);

      setUsers(sortedUsers || []); // ソート後のデータをusers状態に保存します。データが空の場合は空の配列を設定します。
    } catch (error) {
      // データ取得に失敗した場合のエラーメッセージをコンソールに出力します。
      console.error("アカウント情報の取得に失敗しました: " + error.message);
    }
  };

  // コンポーネントが最初に表示されるときに、fetchData関数を実行してデータを取得します。
  useEffect(() => {
    fetchData();
  }, []); // このuseEffectは、最初のマウント時にのみ実行されます。

  // アカウントが選択されたときに呼び出される関数
  const handleAccountSelect = (user) => {
    setSelectedAccount(user.family_id); // 選択されたアカウントのIDをグローバル状態に設定
    setSelectedUserAccount(user.userid); // 選択されたアカウントのIDをグローバル状態に設定
    handleClose(); // モーダルを閉じる
  };

  // 取得したユーザーデータを基にボタンをレンダリングする関数
  const renderAccountButtons = () => {
    // users配列の各ユーザーに対してボタンを生成
    return users.map((user) => (
      <Box mt={2} key={user.userid}>
        <Button
          fullWidth // ボタンを横幅いっぱいに設定
          variant="contained" // ボタンのスタイルを設定
          sx={{
            backgroundColor: "#e66a63 !important", // ホバーしていないときの背景色を強制的に設定
            color: "#fff !important", // ボタンのテキストカラーを強制的に白色に設定
            "&:hover": {
              backgroundColor: "#1565c0 !重要", // ホバー時に濃い青色に設定
              border: "1px solid #fff", // ホバー時に白いボーダーを追加して視認性を向上
            },
          }}
          onClick={() => handleAccountSelect(user)} // ボタンがクリックされたときにアカウントを選択
        >
          {user.user_name} {/* ボタンに表示するアカウント名 */}
        </Button>
      </Box>
    ));
  };

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
          アカウントを選択 {/* モーダルのタイトル */}
        </Typography>
        <Typography
          id="account-modal-description" // 説明文のIDを設定
          variant="body1" // 説明文のスタイルを設定
          mt={2} // 説明文の上にマージン（余白）を設定
        >
          ログインするアカウントを選んでください: {/* モーダル内の説明文 */}
        </Typography>
        {renderAccountButtons()}
        {/* Supabaseから取得したデータを使ってボタンを表示 */}
      </Box>
    </Modal>
  );
}

"use client"; // クライアントサイドで実行されるコードであることを指定しています。

import React, { useState, useContext, useRef } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートします。
import UploadTodoModal from "@/components/posts/post_todo_modal"; // Todo登録用のモーダルコンポーネントをインポートします。
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を取得するためのコンテキストをインポートします。

export default function Post_Footer({ theme, refreshTodos }) {
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を管理するステートです。
  const { selectedAccount } = useContext(AccountContext); // コンテキストから現在選択されているアカウントを取得します。
  const buttonRef = useRef(null); // ボタン要素へのリファレンスを作成します。

  // モーダルを開く関数です。
  const openModal = () => {
    setModalOpen(true); // モーダルを開くためにステートをtrueに設定します。
  };

  // モーダルを閉じる関数です。
  const closeModal = () => {
    setModalOpen(false); // モーダルを閉じるためにステートをfalseに設定します。
    setTimeout(() => {
      if (buttonRef.current) {
        // フォーカスを再設定し、aria-hidden属性が問題にならないようにします
        buttonRef.current.removeAttribute("aria-hidden"); // aria-hidden属性を削除
        buttonRef.current.focus(); // モーダルを閉じた後、ボタンにフォーカスを戻します。
      }
    }, 0); // 次のレンダリング後にフォーカスを戻す
  };

  return (
    <div
      style={{
        bottom: 10,
        width: "100%",
      }}
    >
      <div>
        <Button
          variant="contained"
          onClick={openModal} // ボタンがクリックされたときにモーダルを開く関数を呼び出します。
          ref={buttonRef} // ボタンのリファレンスを設定します。
          sx={{
            borderRadius: 50,
            "&:hover": {
              backgroundColor: theme === "light" ? "#303f9f" : "#c51162", // テーマに応じてホバーカラーを変更します。
            },
          }}
        >
          予定を登録する {/* ボタンに表示されるテキストです。 */}
        </Button>
      </div>
      <UploadTodoModal
        open={modalOpen} // モーダルの開閉状態を渡します。
        handleClose={closeModal} // モーダルを閉じるための関数を渡します。
        userid={selectedAccount} // コンテキストから取得した選択されたアカウントIDをモーダルに渡します。
        onTodoAdded={refreshTodos} // Todoが追加された際に呼ばれるコールバック関数を渡します。
      />
    </div>
  );
}

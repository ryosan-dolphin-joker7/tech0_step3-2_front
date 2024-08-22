"use client"; // クライアントサイドで実行されるコードであることを指定しています。

import React, { useState, useContext, useRef } from "react";
import { Button } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートします。
import UploadTodoModal from "@/components/posts/post_todo_modal"; // Todo登録用のモーダルコンポーネントをインポートします。
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を取得するためのコンテキストをインポートします。

export default function Post_Footer({ theme, refreshTodos }) {
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を管理するステートです。
  const { selectedAccount, selectedUserAccount } = useContext(AccountContext); // コンテキストから現在選択されているアカウントを取得します。
  const buttonRef = useRef(null); // ボタン要素へのリファレンスを作成します。

  // モーダルを開く関数です。
  const openModal = () => {
    // ボタンに `inert` 属性を追加して、モーダルが開いている間ボタンがフォーカスを受けないようにします
    if (buttonRef.current) {
      buttonRef.current.setAttribute("inert", "true"); // inert属性を設定してフォーカスを防止
    }
    setModalOpen(true); // モーダルを開くためにステートをtrueに設定します。
  };

  // モーダルを閉じる関数です。
  const closeModal = () => {
    setModalOpen(false); // モーダルを閉じるためにステートをfalseに設定します。
    setTimeout(() => {
      if (buttonRef.current) {
        // モーダルが閉じられた後に、ボタンから `inert` 属性を削除して再度フォーカス可能にします
        buttonRef.current.removeAttribute("inert"); // inert属性を削除してフォーカスを再度可能に
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
            borderRadius: 50, // ボタンの角を丸くします。
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
        userid={selectedUserAccount} // コンテキストから取得した選択されたアカウントIDをモーダルに渡します。
        family_id={selectedAccount} // コンテキストから取得した選択されたアカウントIDをモーダルに渡します。
        onTodoAdded={refreshTodos} // Todoが追加された際に呼ばれるコールバック関数を渡します。
      />
    </div>
  );
}

// src/app/todo/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

import { useState } from "react"; // useStateフックをReactからインポート
// import TaskTable from "@/components/taskTable"; // タスクテーブルコンポーネントをインポート
// import EditDialog from "./editDialog"; // 編集ダイアログコンポーネントのインポート（コメントアウト中）
// import RemoveDialog from "./removeDialog"; // 削除ダイアログコンポーネントのインポート（コメントアウト中）

// ルートレイアウトコンポーネントを定義
export function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children} {/* 子コンポーネントをここに表示 */}
        </main>
      </body>
    </html>
  );
}

// インデックスページコンポーネントを定義
export function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center pt-24"></div>
  );
}

// タスクコンポーネントを定義
export default function Task(props) {
  const [showEditModal, setShowEditModal] = useState(false); // 編集モーダルの表示状態を管理するステート
  const [showRemoveModal, setShowRemoveModal] = useState(false); // 削除モーダルの表示状態を管理するステート

  // 仮のプロパティ（propsを使用する場合は修正が必要）
  const id = "props.id";
  const text = "props.text";
  const update_at = "props.update_at";
  let last_update = new Date(update_at); // 更新日時をDateオブジェクトに変換

  return (
    <>
      <div>
        <p className="text-gray-600 break-all">{text}</p>{" "}
        {/* タスクのテキストを表示 */}
        <p className="text-xs text-gray-400">
          最終更新日時：{last_update.toLocaleString("ja-JP")}{" "}
          {/* 最終更新日時を表示 */}
        </p>
      </div>

      <div className="flex">
        <button
          type="button"
          className="w-9 text-blue-500 hover:text-blue-600"
          onClick={() => setShowEditModal(true)} // 編集モーダルを表示する
        >
          編集
        </button>
        <button
          type="button"
          className="ml-2 w-9 text-red-500 hover:text-red-600"
          onClick={() => setShowRemoveModal(true)} // 削除モーダルを表示する
        >
          削除
        </button>
      </div>

      {showEditModal ? (
        // 編集ダイアログコンポーネント（コメントアウト中）
        // <EditDialog
        //   id={id}
        //   taskList={props.taskList}
        //   showModal={setShowEditModal}
        // />
        <div>編集ダイアログがここに表示されます</div>
      ) : null}

      {showRemoveModal ? (
        // 削除ダイアログコンポーネント（コメントアウト中）
        // <RemoveDialog
        //   id={id}
        //   taskList={props.taskList}
        //   showModal={setShowRemoveModal}
        // />
        <div>削除ダイアログがここに表示されます</div>
      ) : null}
    </>
  );
}

"use client";
import { useState } from "react";
import EditDialog from "./editDialog";
import RemoveDialog from "./removeDialog";

export default function Task(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const { id, text, update_at, taskList } = props;
  const last_update = new Date(update_at);

  return (
    <>
      <div>
        <p className="text-gray-600 break-all">{text}</p>
        <p className="text-xs text-gray-400">
          最終更新日時：{last_update.toLocaleString("ja-JP")}
        </p>
      </div>

      <div className="flex">
        <button
          type="button"
          className="w-9 text-blue-500 hover:text-blue-600"
          onClick={() => setShowEditModal(true)}
        >
          編集
        </button>
        <button
          type="button"
          className="ml-2 w-9 text-red-500 hover:text-red-600"
          onClick={() => setShowRemoveModal(true)}
        >
          削除
        </button>
      </div>

      {showEditModal && (
        <EditDialog id={id} taskList={taskList} showModal={setShowEditModal} />
      )}
      {showRemoveModal && (
        <RemoveDialog
          id={id}
          taskList={taskList}
          showModal={setShowRemoveModal}
        />
      )}
    </>
  );
}

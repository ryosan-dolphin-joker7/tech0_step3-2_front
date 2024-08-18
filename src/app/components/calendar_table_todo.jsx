"use client";

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/supabaseClient";
import { AccountContext } from "@/components/AccountProvider";
import Modal from "@/components/posts/update_todo_modal";

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTodoDetails, setSelectedTodoDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAccount, selectedUserAccount } = useContext(AccountContext);

  // データを取得する関数
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("todos").select(`
        *,
        assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
        completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
      `);

      if (error) {
        console.error("Error fetching data: ", error);
        setError("データの取得に失敗しました");
      } else {
        setItems(data);
      }
    } catch (fetchError) {
      console.error("Fetch error: ", fetchError);
      setError("データの取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // コンポーネントがマウントされたときにデータを取得
  }, []);

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const selectedTodo = items.filter(
    (item) =>
      item.assignee.family_id === selectedAccount && item.end_date === today
  );

  const toggleTaskState = async (id, currentState) => {
    try {
      const newState = !currentState;
      const newCompleterId = newState ? selectedUserAccount : null;

      const { error } = await supabase
        .from("todos")
        .update({
          state: newState,
          completer_user_id: newCompleterId,
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating task state: ", error);
        setError("タスクの状態更新に失敗しました");
      } else {
        // 最新のデータを取得してitemsを更新
        fetchData();
      }
    } catch (updateError) {
      console.error("Update error: ", updateError);
      setError("タスクの状態更新中にエラーが発生しました");
    }
  };

  const handleRowClick = (todo) => {
    setSelectedTodoDetails(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodoDetails(null);
  };

  return (
    <div>
      <h1>今日のスケジュール</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              タスク
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>担当</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>完了</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              完了者
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedTodo.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.assignee.user_name}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={() => toggleTaskState(item.id, item.state)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.completer?.user_name || "未完了"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        todoDetails={selectedTodoDetails}
      />
    </div>
  );
};

export default Home;

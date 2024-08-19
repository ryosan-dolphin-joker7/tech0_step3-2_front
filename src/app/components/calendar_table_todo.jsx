"use client"; // このファイルはクライアントサイドでのみ実行されることを示す

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/app/supabaseClient"; // Supabase クライアントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート
import Modal from "@/components/posts/update_todo_modal"; // Todo 更新用のモーダルコンポーネントをインポート

const Home = () => {
  // useState フックで状態を管理
  const [items, setItems] = useState([]); // Todo リストの項目を保存する状態
  const [error, setError] = useState(null); // エラーメッセージを保存する状態
  const [loading, setLoading] = useState(true); // データ読み込み中かどうかを示す状態
  const [selectedTodoDetails, setSelectedTodoDetails] = useState(null); // 選択された Todo の詳細を保存する状態
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルが開いているかどうかを示す状態
  const { selectedAccount, selectedUserAccount } = useContext(AccountContext); // アカウントコンテキストから選択されたアカウント情報を取得

  // データを Supabase から非同期で取得する関数
  const fetchData = async () => {
    try {
      // todos テーブルからデータを取得
      const { data, error } = await supabase.from("todos").select(`
        *,
        assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
        completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
      `);

      if (error) {
        console.error("Error fetching data: ", error); // コンソールにエラーを表示
        setError("データの取得に失敗しました"); // ユーザーにエラーメッセージを表示
      } else {
        setItems(data); // 取得したデータを状態に保存
      }
    } catch (fetchError) {
      console.error("Fetch error: ", fetchError); // 取得時のエラーをコンソールに表示
      setError("データの取得中にエラーが発生しました"); // ユーザーにエラーメッセージを表示
    } finally {
      setLoading(false); // データの取得が完了したので読み込み状態を解除
    }
  };

  // コンポーネントがマウントされたときに fetchData を実行してデータを取得
  useEffect(() => {
    fetchData();
  }, []); // 空の依存配列により、コンポーネントの初回レンダリング時のみ実行される

  // 今日の日付をフォーマットして取得
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Tokyo", // 日本のタイムゾーンを使用
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 選択されたアカウントに属する、今日締め切りの Todo をフィルタリング
  const selectedTodo = items.filter(
    (item) =>
      item.assignee.family_id === selectedAccount && item.end_date === today
  );

  // タスクの完了状態をトグルする関数
  const toggleTaskState = async (id, currentState) => {
    try {
      const newState = !currentState; // 現在の状態を反転させる
      const newCompleterId = newState ? selectedUserAccount : null; // 完了者を設定またはクリア

      // Supabase にタスク状態を更新するリクエストを送信
      const { error } = await supabase
        .from("todos")
        .update({
          state: newState,
          completer_user_id: newCompleterId,
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating task state: ", error); // エラーが発生した場合、コンソールに表示
        setError("タスクの状態更新に失敗しました"); // ユーザーにエラーメッセージを表示
      } else {
        fetchData(); // 更新後に最新のデータを再取得
      }
    } catch (updateError) {
      console.error("Update error: ", updateError); // 更新時のエラーをコンソールに表示
      setError("タスクの状態更新中にエラーが発生しました"); // ユーザーにエラーメッセージを表示
    }
  };

  // 行をクリックしたときにモーダルを開く関数
  const handleRowClick = (todo) => {
    setSelectedTodoDetails(todo); // 選択された Todo の詳細を状態に保存
    setIsModalOpen(true); // モーダルを開く
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
    setSelectedTodoDetails(null); // 選択された Todo の詳細をクリア
  };

  return (
    <div>
      <h1>今日のスケジュール</h1> {/* ページのタイトル */}
      {loading && <p>読み込み中...</p>} {/* データ読み込み中のメッセージ */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* エラーメッセージの表示 */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {/* テーブルのスタイル設定 */}
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
              key={item.id} // 各行に一意のキーを設定
              onClick={() => handleRowClick(item)} // 行がクリックされたときにモーダルを表示
              style={{ cursor: "pointer" }} // 行をクリック可能に見せるためにカーソルを設定
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title} {/* タスクのタイトルを表示 */}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.assignee.user_name} {/* タスクの担当者を表示 */}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox" // タスクの状態を示すチェックボックス
                  checked={item.state} // 完了状態に応じてチェック状態を設定
                  onChange={() => toggleTaskState(item.id, item.state)} // チェックボックスが変更されたときにタスク状態をトグル
                  onClick={(e) => e.stopPropagation()} // チェックボックスをクリックしても行のクリックイベントが発火しないようにする
                />
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.completer?.user_name || "未完了"}
                {/* タスクを完了したユーザー名を表示、未完了の場合は「未完了」と表示 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen} // モーダルが開いているかどうかを指定
        onClose={closeModal} // モーダルを閉じる関数を渡す
        todoDetails={selectedTodoDetails} // モーダルに渡す選択された Todo の詳細
      />
    </div>
  );
};

export default Home;

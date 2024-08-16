"use client"; // クライアント側（ブラウザ）で動作するコードであることを示しています。

import { useEffect, useState, useContext } from "react"; // Reactのフックをインポートしています。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートしています。
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポートしています。

const Home = () => {
  const [items, setItems] = useState([]); // Todoアイテムのリストを保持するためのステート変数
  const [error, setError] = useState(null); // エラーメッセージを保持するためのステート変数
  const [loading, setLoading] = useState(true); // ローディング状態（データが取得中かどうか）を管理するためのステート変数
  const [selectedTodoDetails, setSelectedTodoDetails] = useState(null); // 選択されたTodoの詳細情報を保持するためのステート変数
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示/非表示を管理するためのステート変数
  const { selectedAccount } = useContext(AccountContext); // AccountContextから、現在選択されているアカウントIDを取得

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");

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

    fetchData();
  }, []); // 空の依存配列により、この副作用はコンポーネントの初回表示時にのみ実行されます。

  const selectedTodo = items.filter((item) => item.userid === selectedAccount);

  const toggleTaskState = async (id, currentState) => {
    try {
      const newState = !currentState;
      const { error } = await supabase
        .from("todos")
        .update({ state: newState })
        .eq("id", id);

      if (error) {
        console.error("Error updating task state: ", error);
        setError("タスクの状態更新に失敗しました");
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, state: newState } : item
          )
        );
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

  const handleModalClick = (e) => {
    e.stopPropagation(); // モーダルコンテンツ内のクリックイベントがモーダル全体に伝播しないようにする
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
            <th style={{ border: "1px solid black", padding: "8px" }}>詳細</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              いつまでにやるか
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>完了</th>
          </tr>
        </thead>
        <tbody>
          {selectedTodo.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }} // 行をクリック可能にするためにカーソルを変更
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.contents}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.end_date}
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
                  checked={item.state} // stateがtrueの場合はチェックが入る
                  onChange={() => toggleTaskState(item.id, item.state)} // 状態を切り替える関数を呼び出す
                  onClick={(e) => e.stopPropagation()} // チェックボックスのクリックで行クリックイベントが発生しないようにする
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* モーダルの表示 */}
      {isModalOpen && (
        <div
          style={modalOverlayStyle} // 半透明の背景を適用
          onClick={closeModal} // 背景がクリックされたときにモーダルを閉じる
        >
          <div
            style={modalContentStyle} // モーダルのコンテンツ部分に不透明な背景を適用
            onClick={handleModalClick} // モーダルコンテンツ内のクリックはモーダルを閉じない
          >
            <h2>Todoの詳細</h2>
            <p>
              <strong>タスク:</strong> {selectedTodoDetails.title}
            </p>
            <p>
              <strong>詳細:</strong> {selectedTodoDetails.contents}
            </p>
            <p>
              <strong>いつまでにやるか:</strong> {selectedTodoDetails.end_date}
            </p>
            <p>
              <strong>完了状態:</strong>{" "}
              {selectedTodoDetails.state ? "完了" : "未完了"}
            </p>
            <button onClick={closeModal}>閉じる</button> {/* 閉じるボタン */}
          </div>
        </div>
      )}
    </div>
  );
};

// モーダル全体の背景スタイル設定
const modalOverlayStyle = {
  position: "fixed", // 画面に固定
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // 背景を半透明の黒に設定
  display: "flex", // モーダルを中央に配置するためにflexを使用
  alignItems: "center",
  justifyContent: "center",
};

// モーダルのコンテンツ部分のスタイル設定
const modalContentStyle = {
  backgroundColor: "white", // コンテンツの背景色を白に設定
  padding: "20px", // コンテンツ内の余白
  borderRadius: "5px", // 角を丸くする
  width: "400px",
  textAlign: "center", // 中央揃え
};

export default Home; // Homeコンポーネントをエクスポートして他のファイルから使用可能にする

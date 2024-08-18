"use client"; // クライアント側（ブラウザ）で動作するコードであることを示しています。

import { useEffect, useState, useContext } from "react"; // Reactのフックをインポートしています。
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートしています。Supabaseはバックエンドサービスで、データベースや認証などの機能を提供します。
import { AccountContext } from "@/app/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポートしています。
import Modal from "@/app/components/posts/update_todo_modal"; // Todoの更新用モーダルコンポーネントをインポートしています。

const Home = () => {
  // 以下は、コンポーネント内で使用するためのステート（状態）変数の定義です。
  const [items, setItems] = useState([]); // Todoアイテムのリストを保持するためのステート。初期値は空の配列。
  const [error, setError] = useState(null); // エラーメッセージを保持するためのステート。初期値はnull。
  const [loading, setLoading] = useState(true); // ローディング状態（データが取得中かどうか）を管理するためのステート。初期値はtrue。
  const [selectedTodoDetails, setSelectedTodoDetails] = useState(null); // 選択されたTodoの詳細情報を保持するためのステート。初期値はnull。
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示/非表示を管理するためのステート。初期値はfalse。
  const { selectedAccount } = useContext(AccountContext); // AccountContextから、現在選択されているアカウントIDを取得します。

  // コンポーネントの初回レンダリング時にデータを取得するための副作用を設定します。
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Supabaseから'todos'テーブルの全データを取得します。
        const { data, error } = await supabase.from("todos").select(`
          *,
          assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
          completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
        `);
        // ユーザー情報を取得するためのクエリを追加します。

        if (error) {
          console.error("Error fetching data: ", error); // エラーが発生した場合、コンソールにエラーメッセージを表示します。
          setError("データの取得に失敗しました"); // エラーメッセージをステートにセットします。
        } else {
          setItems(data); // 取得したデータをitemsステートにセットします。
        }
      } catch (fetchError) {
        console.error("Fetch error: ", fetchError); // データ取得中にエラーが発生した場合、コンソールにエラーメッセージを表示します。
        setError("データの取得中にエラーが発生しました"); // エラーメッセージをステートにセットします。
      } finally {
        setLoading(false); // データ取得が完了したため、ローディング状態を解除します。
      }
    };

    fetchData(); // データ取得関数を実行します。
  }, []); // 空の依存配列により、この副作用はコンポーネントの初回表示時にのみ実行されます。

  // 現在選択されているアカウントに紐づくTodoアイテムのみをフィルタリングします。
  const selectedTodo = items.filter(
    (item) => item.assignee.family_id === selectedAccount
  );

  // タスクの状態を切り替える関数です。
  const toggleTaskState = async (id, currentState) => {
    try {
      const newState = !currentState; // 現在の状態を反転させます（trueならfalse、falseならtrueにします）。
      const { error } = await supabase
        .from("todos")
        .update({ state: newState }); // タスクの状態を更新します。

      if (error) {
        console.error("Error updating task state: ", error); // エラーが発生した場合、コンソールにエラーメッセージを表示します。
        setError("タスクの状態更新に失敗しました"); // エラーメッセージをステートにセットします。
      } else {
        // 更新が成功した場合、itemsステートを更新して新しい状態を反映します。
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, state: newState } : item
          )
        );
      }
    } catch (updateError) {
      console.error("Update error: ", updateError); // 更新処理中にエラーが発生した場合、コンソールにエラーメッセージを表示します。
      setError("タスクの状態更新中にエラーが発生しました"); // エラーメッセージをステートにセットします。
    }
  };

  // Todoアイテムの行がクリックされたときに、モーダルを表示し、詳細をセットします。
  const handleRowClick = (todo) => {
    setSelectedTodoDetails(todo); // クリックされたTodoアイテムの詳細をセットします。
    setIsModalOpen(true); // モーダルを表示します。
  };

  // モーダルを閉じる関数です。
  const closeModal = () => {
    setIsModalOpen(false); // モーダルを非表示にします。
    setSelectedTodoDetails(null); // 選択されたTodoの詳細情報をクリアします。
  };

  return (
    <div>
      <h1>今日のスケジュール</h1>
      {loading && <p>読み込み中...</p>}
      {/* ローディング中はこのメッセージを表示します */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* エラーが発生した場合、このメッセージを表示します */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {/* テーブルのスタイルを設定します */}
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              タスク
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              いつまでにやるか
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
              onClick={() => handleRowClick(item)} // 行がクリックされたときに詳細を表示する処理
              style={{ cursor: "pointer" }} // 行をクリック可能にするためにカーソルを変更
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title} {/* タスクのタイトル */}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.end_date} {/* タスクの終了期限 */}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.assignee.user_name} {/* タスクの担当者 */}
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
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.completer?.user_name || "未完了"} {/* タスクの完了者 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* モーダルの表示 */}
      <Modal
        isOpen={isModalOpen} // モーダルの表示状態
        onClose={closeModal} // モーダルを閉じる処理
        todoDetails={selectedTodoDetails} // モーダルに渡すTodoの詳細情報
      />
    </div>
  );
};

export default Home; // Homeコンポーネントをエクスポートして他のファイルから使用可能にする

"use client"; // クライアント側で動作するコードであることを指定しています。

import { useEffect, useState, useContext } from "react"; // useContextを含めたReactのフックをインポートします。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートします。
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート

const Home = () => {
  const [items, setItems] = useState([]); // Todoアイテムのリストを保持するためのステートを定義します。
  const [error, setError] = useState(null); // エラーメッセージを保持するためのステートを定義します。
  const [loading, setLoading] = useState(true); // ローディング状態を保持するためのステートを追加します。
  const { selectedAccount } = useContext(AccountContext); // AccountContextから選択されたアカウントIDを取得します

  // コンポーネントがマウントされたときにデータを取得するための副作用フックを設定します。
  useEffect(() => {
    const fetchData = async () => {
      try {
        // SupabaseからすべてのTodoデータを取得します
        const { data, error } = await supabase.from("todos").select("*");

        if (error) {
          console.error("Error fetching data: ", error); // エラーログを出力します。
          setError("データの取得に失敗しました"); // エラーメッセージをステートに設定します。
        } else {
          setItems(data); // 取得したデータをステートに設定します。
        }
      } catch (fetchError) {
        console.error("Fetch error: ", fetchError); // エラーログを出力します。
        setError("データの取得中にエラーが発生しました"); // エラーメッセージをステートに設定します。
      } finally {
        setLoading(false); // ローディング状態を解除します。
      }
    };

    fetchData(); // データ取得関数を実行します。
  }, []); // 空の依存配列により、コンポーネントがマウントされたときにのみ実行されます。

  // selectedAccountに対応するすべてのTodoをフィルタリングする
  const selectedTodo = items.filter((item) => item.userid === selectedAccount);
  // itemsの中からselectedAccountに対応するuseridを持つTodoを配列で返します

  // タスクを完了/未完了としてマークするための関数を定義します。
  const toggleTaskState = async (id, currentState) => {
    try {
      const newState = !currentState; // 現在の状態を反転させます（true -> false, false -> true）
      const { error } = await supabase
        .from("todos")
        .update({ state: newState }) // `state`を新しい値に更新します。
        .eq("id", id); // `id`が一致するレコードのみを更新します。

      if (error) {
        console.error("Error updating task state: ", error); // エラーログを出力します。
        setError("タスクの状態更新に失敗しました"); // エラーメッセージをステートに設定します。
      } else {
        // 成功時には、ローカルのステートも更新して、UIに反映します。
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, state: newState } : item
          )
        );
      }
    } catch (updateError) {
      console.error("Update error: ", updateError); // エラーログを出力します。
      setError("タスクの状態更新中にエラーが発生しました"); // エラーメッセージをステートに設定します。
    }
  };

  return (
    <div>
      <h1>今日のスケジュール</h1> {/* 見出しを表示します */}
      {loading && <p>読み込み中...</p>}{" "}
      {/* データ取得中のローディングメッセージを表示します */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* エラーが発生した場合にエラーメッセージを表示します */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              scope="col"
              style={{ border: "1px solid black", padding: "8px" }}
            >
              タスク
            </th>
            <th
              scope="col"
              style={{ border: "1px solid black", padding: "8px" }}
            >
              詳細
            </th>
            <th
              scope="col"
              style={{ border: "1px solid black", padding: "8px" }}
            >
              いつまでにやるか
            </th>
            <th
              scope="col"
              style={{ border: "1px solid black", padding: "8px" }}
            >
              完了
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedTodo.map((item) => (
            <tr key={item.id}>
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
                {/* チェックボックスを追加し、クリックでタスクの完了状態を切り替えます */}
                <input
                  type="checkbox"
                  checked={item.state} // `state`がtrueの場合はチェックを入れる
                  onChange={() => toggleTaskState(item.id, item.state)} // チェックボックスの状態が変更されたときに、タスクの完了状態を切り替えます
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home; // Homeコンポーネントをエクスポートします。

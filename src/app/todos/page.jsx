"use client"; // このファイルがクライアントサイドで動作することを指定

import { useState, useEffect } from "react"; // Reactのフックをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート
import Table_Todo from "@/components/table_todo"; // Todoリストを表示するカスタムコンポーネントをインポート
import Grid from "@mui/material/Grid"; // MUIのGridコンポーネントをインポート

function TodoPage() {
  // ToDoリストのデータを管理する状態
  const [todos, setTodos] = useState([]);
  // 新しいToDoのタイトルを管理する状態
  const [newTodo, setNewTodo] = useState("");
  // 今日の日付を管理する状態
  const [today, setToday] = useState(new Date());
  // 日付のリストを管理する状態
  const [dates, setDates] = useState([]);
  // 選択されたフィルタを管理する状態
  const [selectedFilter, setSelectedFilter] = useState("すべて");
  // 選択された日付を管理する状態
  const [selectedDate, setSelectedDate] = useState(today);

  // コンポーネントがマウントされたときに日付のリストを生成する
  useEffect(() => {
    const generateDates = () => {
      const currentDate = new Date(); // 現在の日付を取得
      const tempDates = []; // 日付を格納する一時的な配列

      // 今日を中央に配置するために、-2日から+2日までの5日分の日付をリストに追加
      for (let i = -2; i <= 2; i++) {
        const newDate = new Date();
        newDate.setDate(currentDate.getDate() + i); // 日付を設定
        tempDates.push(newDate); // 配列に追加
      }

      setDates(tempDates); // 生成した日付リストを状態にセット
    };

    generateDates(); // 日付リストを生成する関数を実行
  }, []); // 空の依存配列を指定することで、マウント時に一度だけ実行

  // 選択された日付やフィルタに基づいてToDoリストを取得する
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos") // "todos"テーブルからデータを取得
        .select("*")
        .gte("start_date", selectedDate.toISOString().split("T")[0]) // 選択された日付と一致するデータを取得
        .lte("end_date", selectedDate.toISOString().split("T")[0]);

      if (!error) {
        let filteredData = data;

        // 選択されたフィルタに基づいてデータを絞り込む
        if (selectedFilter !== "すべて") {
          filteredData = filteredData.filter(
            (todo) => todo.contents === selectedFilter
          );
        }

        setTodos(filteredData); // フィルタされたToDoリストを状態にセット
      } else {
        console.error("Error fetching todos:", error.message || error); // エラーハンドリング
      }
    };

    fetchTodos(); // ToDoリストを取得する関数を実行

    // クリーンアップ関数を返す（アンマウント時に実行）
    return () => {
      // 非同期処理に関しては、特に明示的なクリーンアップは必要ないが、ここにクリーンアップロジックを追加することも可能
    };
  }, [selectedDate, selectedFilter]); // 選択された日付やフィルタが変更されたときに実行

  // 新しいToDoを追加する関数
  const addTodo = async () => {
    if (newTodo.trim()) {
      // 新しいToDoのタイトルが空白でないか確認
      const { data, error } = await supabase.from("todos").insert([
        {
          title: newTodo, // ToDoのタイトル
          start_date: selectedDate, // 開始日付
          end_date: selectedDate, // 終了日付
          state: false, // 状態（未完了）
          contents: selectedFilter, // フィルタ内容
        },
      ]);

      if (!error) {
        setTodos([...todos, ...data]); // 新しいToDoをリストに追加
        setNewTodo(""); // 新しいToDoの入力欄をクリア
      } else {
        console.error("Error adding todo:", error.message || error); // エラーハンドリング
      }
    }
  };

  // ToDoの完了状態をトグル（切り替え）する関数
  const toggleTodoState = async (id, currentState) => {
    const { error } = await supabase
      .from("todos")
      .update({ state: !currentState }) // 状態を反転させる
      .eq("id", id);

    if (!error) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, state: !currentState } : todo
        )
      );
    } else {
      console.error("Error updating todo:", error.message || error); // エラーハンドリング
    }
  };

  // ToDoを削除する関数
  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      setTodos(todos.filter((todo) => todo.id !== id)); // 削除されたToDoをリストから取り除く
    } else {
      console.error("Error deleting todo:", error.message || error); // エラーハンドリング
    }
  };

  return (
    <div>
      <div className="container mx-auto p-20 max-w-md">
        {/* ページのタイトル */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">やること</h1>
        </div>

        {/* 日付スライダー */}
        <div className="flex overflow-x-auto no-scrollbar mb-4">
          {dates.map((date) => (
            <div
              key={date.toISOString()} // 日付のISO文字列をkeyとして使用
              className={`flex-shrink-0 p-2 text-center w-16 ${
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-red-500 text-white" // 選択された日付には特別なスタイルを適用
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedDate(date)} // 日付を選択
            >
              <div>{date.getDate()}</div>
              <div>
                {["日", "月", "火", "水", "木", "金", "土"][date.getDay()]}
              </div>
            </div>
          ))}
        </div>

        {/* フィルタボタン */}
        <div className="flex justify-around mb-4">
          {["すべて", "やること", "まいにち", "よやく"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-1 rounded-full ${
                selectedFilter === filter
                  ? "bg-red-500 text-white" // 選択されたフィルタに特別なスタイルを適用
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedFilter(filter)} // フィルタを選択
            >
              {filter}
            </button>
          ))}
        </div>

        {/* フィルタされたToDoリストの表示 */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 bg-white shadow rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.state}
                  onChange={() => toggleTodoState(todo.id, todo.state)} // チェックボックスで完了状態をトグル
                />
                <span className="text-lg">{todo.title}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Todoリストを表示するためのグリッドレイアウト */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <div
              style={{
                textAlign: "center",
                maxHeight: "300px",
                overflowY: "auto",
                fontSize: "0.8em",
                padding: "10px",
              }}
            >
              <Table_Todo /> {/* Todoリストを表示するコンポーネント */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TodoPage;

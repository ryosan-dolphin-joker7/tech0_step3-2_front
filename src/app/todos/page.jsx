"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポート
import Table_Todo from "@/components/table_todo";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [today, setToday] = useState(new Date()); // 今日の日付を管理
  const [dates, setDates] = useState([]); // 日付のリストを管理
  const [selectedFilter, setSelectedFilter] = useState("すべて"); // フィルタの選択状態
  const [selectedDate, setSelectedDate] = useState(today); // 選択された日付

  useEffect(() => {
    // 今日を中央に配置するために5日分のリストを作成
    const generateDates = () => {
      const currentDate = new Date();
      const tempDates = [];
      for (let i = -2; i <= 2; i++) {
        const newDate = new Date();
        newDate.setDate(currentDate.getDate() + i);
        tempDates.push(newDate);
      }
      setDates(tempDates);
    };

    generateDates();
  }, []);

  // ToDoリストのデータ取得
  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .gte("start_date", selectedDate.toISOString().split("T")[0])
        .lte("end_date", selectedDate.toISOString().split("T")[0]);

      let filteredData = data;

      if (selectedFilter !== "すべて") {
        filteredData = filteredData.filter(
          (todo) => todo.contents === selectedFilter
        );
      }

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(filteredData);
      }
    }
    fetchTodos();
  }, [selectedDate, selectedFilter]);

  const addTodo = async () => {
    if (newTodo.trim()) {
      const { data, error } = await supabase.from("todos").insert([
        {
          title: newTodo,
          start_date: selectedDate,
          end_date: selectedDate,
          state: false,
          contents: selectedFilter,
        },
      ]);
      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setTodos([...todos, ...data]);
        setNewTodo("");
      }
    }
  };

  const toggleTodoState = async (id, currentState) => {
    const { error } = await supabase
      .from("todos")
      .update({ state: !currentState })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, state: !currentState } : todo
        )
      );
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // 画面全体の高さを確保
        textAlign: "center", // テキストを中央揃え
      }}
    >
      <div className="container mx-auto p-20 max-w-md">
        {/* ページのタイトル */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">やること</h1>
        </div>

        {/* 日付スライダー */}
        <div className="flex overflow-x-auto no-scrollbar mb-4">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`flex-shrink-0 p-2 text-center w-16 ${
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-red-500 text-white"
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
                  ? "bg-red-500 text-white"
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
    </Box>
  );
}

export default TodoPage;

// src/app/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase...");

      try {
        const { data, error } = await supabase.from("todos").select("*");

        if (error) {
          console.error("Error fetching data: ", error);
          setError("データの取得に失敗しました");
        } else {
          console.log("Data fetched successfully:", data);
          setItems(data);
        }
      } catch (fetchError) {
        console.error("Fetch error: ", fetchError);
        setError("データの取得中にエラーが発生しました");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.title}</li> // 正しいフィールド名を使用
        ))}
      </ul>
    </div>
  );
};
export default Home;

// src/app/lib/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import BackButton from "../components/back_button";

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
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Contents
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Start Date
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.title}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.contents}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.start_date}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.end_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <BackButton>戻る</BackButton>
      </div>
    </div>
  );
};
export default Home;

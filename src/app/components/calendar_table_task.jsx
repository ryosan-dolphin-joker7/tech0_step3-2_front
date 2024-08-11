// src/app/table/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

// 必要なモジュールやコンポーネントをインポートします。
import { useEffect, useState } from "react"; // Reactのフックをインポートします。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートします。
import BackButton from "@/components/back_button"; // カスタムバックボタンコンポーネントをインポートします。
import Typography from "@mui/material/Typography"; // テキスト表示用のコンポーネントをインポートします。

const Home = () => {
  // アイテムデータとエラーメッセージを保持するためのステートを定義します。
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // コンポーネントがマウントされたときにデータを取得するための副作用フックを設定します。
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase..."); // データ取得開始のログを出力します。

      try {
        // Supabaseから"todos"テーブルのデータを取得します。
        const { data, error } = await supabase.from("todos").select("*");

        if (error) {
          // データ取得中にエラーが発生した場合の処理
          console.error("Error fetching data: ", error); // エラーログを出力します。
          setError("データの取得に失敗しました"); // エラーメッセージをステートに設定します。
        } else {
          // データ取得が成功した場合の処理
          console.log("Data fetched successfully:", data); // 取得したデータのログを出力します。
          setItems(data); // 取得したデータをステートに設定します。
        }
      } catch (fetchError) {
        // データ取得中に予期しないエラーが発生した場合の処理
        console.error("Fetch error: ", fetchError); // エラーログを出力します。
        setError("データの取得中にエラーが発生しました"); // エラーメッセージをステートに設定します。
      }
    };

    fetchData(); // データ取得関数を実行します。
  }, []); // 空の依存配列により、コンポーネントがマウントされたときにのみ実行されます。

  return (
    <div>
      <h1>スケジュール</h1> {/* 見出しを表示します */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* エラーが発生した場合にエラーメッセージを表示します */}
      {/* テーブル形式でデータを表示します */}
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
                {item.end_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home; // Homeコンポーネントをエクスポートします。

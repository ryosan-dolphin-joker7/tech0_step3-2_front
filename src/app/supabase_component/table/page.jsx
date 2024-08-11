// src/app/table/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

// 必要なモジュールやコンポーネントをインポートします。
import { useEffect, useState } from "react"; // Reactのフックをインポートします。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートします。
import BackButton from "@/components/back_button"; // カスタムバックボタンコンポーネントをインポートします。
import Accordion from "@mui/material/Accordion"; // MUIのアコーディオンコンポーネントをインポートします。
import AccordionSummary from "@mui/material/AccordionSummary"; // アコーディオンのサマリー部分をインポートします。
import AccordionDetails from "@mui/material/AccordionDetails"; // アコーディオンの詳細部分をインポートします。
import Typography from "@mui/material/Typography"; // テキスト表示用のコンポーネントをインポートします。
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // アコーディオンの拡張アイコンをインポートします。

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
      <h1>Todo List</h1> {/* 見出しを表示します */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* エラーが発生した場合にエラーメッセージを表示します */}
      {/* テーブル形式でデータを表示します */}
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
      {/* アコーディオン形式でデータを表示します */}
      <div>
        <h1>Todo List</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* エラーが発生した場合にエラーメッセージを表示します */}
        {items.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} // アコーディオンの拡張アイコンを設定します。
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{item.title}</Typography>{" "}
              {/* アイテムのタイトルを表示します */}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Title:</strong> {item.title}
              </Typography>
              <Typography>
                <strong>Contents:</strong> {item.contents}
              </Typography>
              <Typography>
                <strong>Start Date:</strong> {item.start_date}
              </Typography>
              <Typography>
                <strong>End Date:</strong> {item.end_date}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {/* 戻るボタンを表示します */}
      <div>
        <BackButton>戻る</BackButton>
      </div>
    </div>
  );
};

export default Home; // Homeコンポーネントをエクスポートします。

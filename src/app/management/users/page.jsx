"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";

export default function UserManagementPage() {
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。
  // アイテムデータとエラーメッセージを保持するためのステートを定義します。
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // 現在のテーマに応じてテーマを切り替えます。
  };

  const users = [
    { name: "越智 梨子" },
    { name: "越智 太郎" },
    { name: "越智 舞依" },
    { name: "越智 太志" },
  ];

  // コンポーネントがマウントされたときにデータを取得するための副作用フックを設定します。
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase..."); // データ取得開始のログを出力します。

      try {
        // Supabaseから"todos"テーブルのデータを取得します。
        const { data, error } = await supabase
          .from("userinformation")
          .select("*");

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
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div style={{ paddingTop: "60px" }}></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          ユーザ管理
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "16px" }} />

        <List sx={{ width: "100%" }}>
          {users.map((user, index) => (
            <ListItem
              key={index}
              sx={{
                padding: "12px",
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                borderRadius: "4px",
                marginBottom: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              {user.name}
            </ListItem>
          ))}
        </List>

        <h1>Supabase User List</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                UserName
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Birthdate
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Password
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                ServiceLevel
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {item.username}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {item.birthdate}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {item.password}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {item.servicelevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link href="/management/users/user" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            + 新規登録
          </Button>
        </Link>
        <Link href="/management" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            戻る
          </Button>
        </Link>
      </Box>

      <Footer theme={theme} />
    </>
  );
}

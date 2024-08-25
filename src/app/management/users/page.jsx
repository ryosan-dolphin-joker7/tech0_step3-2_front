"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabaseClient";
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  TextField,
} from "@mui/material";

export default function UserManagementPage() {
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。
  // アイテムデータとエラーメッセージを保持するためのステートを定義します。
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // 選択されたユーザーの情報を保持するステートを定義
  const [updateData, setUpdateData] = useState({
    username: "",
    birthdate: "",
    password: "",
    servicelevel: "",
  }); // 更新フォームのデータを保持するステートを定義

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // 現在のテーマに応じてテーマを切り替えます。
  };

  // コンポーネントがマウントされたときにデータを取得するための副作用フックを設定します。
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase..."); // データ取得開始のログを出力します。

      try {
        // Supabaseから"userinformation"テーブルのデータを取得します。
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

  // ユーザー情報を更新する関数
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("userinformation")
        .update(updateData)
        .eq("userid", selectedUser.userid); // 適切な主キーを使用

      if (error) {
        console.error("Error updating data: ", error);
        setError("データの更新に失敗しました");
      } else {
        console.log("Data updated successfully:", data);
        // 更新後のデータを再取得
        const updatedItems = items.map((item) =>
          item.userid === selectedUser.userid
            ? { ...item, ...updateData }
            : item
        );
        setItems(updatedItems);
        setSelectedUser(null); // 選択状態をリセット
        setUpdateData({
          user_name: "",
          birthdate: "",
          password: "",
          servicelevel: "",
        }); // フォームをリセット
      }
    } catch (updateError) {
      console.error("Update error: ", updateError);
      setError("データの更新中にエラーが発生しました");
    }
  };

  return (
    <div>
      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div style={{ paddingTop: "60px" }}></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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

        <h1>Supabase User List</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <table style={{ borderCollapse: "collapse" }}>
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
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {item.user_name}
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
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedUser(item);
                      setUpdateData({
                        username: item.user_name,
                        birthdate: item.birthdate,
                        password: item.password,
                        servicelevel: item.servicelevel,
                      });
                    }}
                  >
                    編集
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <Box
            component="form"
            onSubmit={handleUpdateUser}
            sx={{
              marginTop: "16px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              label="UserName"
              value={updateData.user_name}
              onChange={(e) =>
                setUpdateData({ ...updateData, user_name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Birthdate"
              value={updateData.birthdate}
              onChange={(e) =>
                setUpdateData({ ...updateData, birthdate: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Password"
              value={updateData.password}
              onChange={(e) =>
                setUpdateData({ ...updateData, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="ServiceLevel"
              value={updateData.servicelevel}
              onChange={(e) =>
                setUpdateData({ ...updateData, servicelevel: e.target.value })
              }
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "16px" }}
            >
              更新
            </Button>
          </Box>
        )}

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
    </div>
  );
}

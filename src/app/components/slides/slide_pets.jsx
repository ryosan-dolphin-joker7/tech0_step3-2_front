"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useEffect, useState } from "react"; // Reactの基本機能をインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { Box, Typography, Button, Divider, TextField } from "@mui/material"; // MUIのコンポーネントをインポート

export default function Slide3() {
  const [theme, setTheme] = useState("light"); // テーマを管理するためのstate
  const [pets, setPets] = useState([]); // ペット情報を保存するためのstate
  const [error, setError] = useState(null); // エラーメッセージを保存するためのstate
  const [selectedPet, setSelectedPet] = useState(null); // 編集対象のペットを保存するためのstate
  const [updateData, setUpdateData] = useState({
    petname: "",
    breed: "",
    birthdate: "",
  }); // ペット情報の更新データを保存するためのstate

  // Supabaseからペット情報を取得するためのuseEffectフック
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase...");

      try {
        // Supabaseからデータを取得
        const { data, error } = await supabase.from("petinformation").select(`
          petid,
          petname,
          breed,
          birthdate,
          users:userid (
            userid,
            user_name
          )
        `);

        // エラーチェック
        if (error) {
          console.error("Error fetching data: ", error);
          setError("データの取得に失敗しました");
        } else {
          console.log("Data fetched successfully:", data);
          setPets(data); // 取得したデータをstateに保存
        }
      } catch (fetchError) {
        console.error("Fetch error: ", fetchError);
        setError("データの取得中にエラーが発生しました");
      }
    };

    fetchData(); // データを取得する関数を呼び出し
  }, []);

  // ペット情報を更新するための関数
  const handleUpdatePet = async (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    try {
      // Supabaseにデータを更新するリクエストを送信
      const { data, error } = await supabase
        .from("petinformation")
        .update(updateData)
        .eq("petid", selectedPet.petid);

      if (error) {
        console.error("Error updating data: ", error);
        setError("データの更新に失敗しました");
      } else {
        console.log("Data updated successfully:", data);
        const updatedPets = pets.map((pet) =>
          pet.petid === selectedPet.petid ? { ...pet, ...updateData } : pet
        );
        setPets(updatedPets); // 更新後のペット情報をstateに保存
        setSelectedPet(null); // 編集対象のペットをリセット
        setUpdateData({
          petname: "",
          breed: "",
          birthdate: "",
        }); // フォームをクリア
      }
    } catch (updateError) {
      console.error("Update error: ", updateError);
      setError("データの更新中にエラーが発生しました");
    }
  };

  return (
    <>
      <div style={{ paddingTop: "60px" }}></div> {/* 上部に余白を追加 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          ペット管理
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "16px" }} />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* エラーメッセージを表示 */}
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          {" "}
          {/* テーブルのスタイルを設定 */}
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                ペットの名前
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                種類
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                誕生日
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                飼い主
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.petname}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.breed}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.birthdate}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.users.username}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedPet(pet);
                      setUpdateData({
                        petname: pet.petname,
                        breed: pet.breed,
                        birthdate: pet.birthdate,
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
        {selectedPet && (
          <Box
            component="form"
            onSubmit={handleUpdatePet}
            sx={{
              marginTop: "16px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              label="ペットの名前"
              value={updateData.petname}
              onChange={(e) =>
                setUpdateData({ ...updateData, petname: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="種類"
              value={updateData.breed}
              onChange={(e) =>
                setUpdateData({ ...updateData, breed: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="誕生日"
              value={updateData.birthdate}
              onChange={(e) =>
                setUpdateData({ ...updateData, birthdate: e.target.value })
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
        <Link href="/management/pets/pet" passHref>
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
    </>
  );
}

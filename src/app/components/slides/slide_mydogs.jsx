"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, useContext, useMemo } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import Popup_Today_Dog from "@/components/posts/popup_today_dog"; // ポップアップ用のコンポーネントをインポート
import OnePetTodoCard from "@/components/one_pet_todo_card"; // ペット情報カード用のコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート

function Slide_Mydogs() {
  const { selectedAccount } = useContext(AccountContext); // AccountContextからselectedAccountを取得

  const [pets, setPets] = useState([]); // すべてのペット情報を管理するためのstateを定義

  // APIからデータを取得する関数
  const fetchData = async () => {
    try {
      const response = await fetch("/api/mydog"); // APIエンドポイントを呼び出し
      if (!response.ok) throw new Error("データ取得に失敗しました");

      const { pets } = await response.json(); // JSON形式でデータを取得
      setPets(pets); // 取得したペット情報をstateに保存
    } catch (error) {
      console.error("ペット情報の取得に失敗しました: ", error.message); // エラーメッセージを出力
    }
  };

  useEffect(() => {
    fetchData(); // コンポーネントが最初に表示されたときにデータを取得
  }, []); // 最初のマウント時にのみ実行

  const selectedPetInfo = useMemo(() => {
    return pets.filter((pet) => pet.family_id === selectedAccount); // selectedAccountに対応するペット情報をフィルタリング
  }, [selectedAccount, pets]);

  return (
    <Box
      sx={{
        display: "flex", // 子要素をフレックスボックスとして表示
        flexDirection: "column", // 子要素を縦に並べる
        alignItems: "center", // 子要素を中央に配置
        minHeight: "100vh", // 画面全体の高さを確保
        textAlign: "center", // テキストを中央揃え
      }}
    >
      <Box
        className="card flex flex-row max-w-sm m-4"
        sx={{ margin: "0 auto" }}
      >
        {selectedPetInfo.length > 0 ? (
          <OnePetTodoCard petTodo={selectedPetInfo[0]} /> // ペット情報カードを表示
        ) : (
          <p>アカウントを選んでください。</p> // ペット情報がない場合のメッセージ
        )}
      </Box>
      <Popup_Today_Dog /> {/* 「今日のわんこ名言」ポップアップを表示 */}
    </Box>
  );
}

export default Slide_Mydogs;

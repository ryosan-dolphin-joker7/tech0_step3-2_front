"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, useContext, useMemo } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import Popup_Today_Dog from "@/components/posts/popup_today_dog"; // ポップアップ用のコンポーネントをインポート
import OnePetTodoCard from "@/components/one_pet_todo_card"; // ペット情報カード用のコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート

function Slide_Mydogs() {
  // AccountContextからselectedAccountを取得します
  const { selectedAccount } = useContext(AccountContext);

  // すべてのペット情報を管理するためのstateを定義します。初期値は空の配列です
  const [pets, setPets] = useState([]);

  // Supabaseからデータを取得する関数を定義します
  const fetchData = async () => {
    try {
      // Supabaseのpetinformationテーブルからすべてのデータを取得します
      const { data: petsData, error } = await supabase
        .from("petinformation") // petinformationテーブルからデータを取得
        .select("*"); // すべてのカラムを選択して取得

      // データ取得中にエラーが発生した場合は、例外をスローします
      if (error) throw error;

      // 取得したペット情報をpets stateに保存します
      setPets(petsData || []); // データが空の場合は空の配列を設定します
    } catch (error) {
      // データ取得に失敗した場合のエラーメッセージをコンソールに出力します
      console.error("ペット情報の取得に失敗しました: ", error.message);
    }
  };

  // コンポーネントが最初に表示されたときにデータを取得するためにfetchData関数を呼び出します
  useEffect(() => {
    fetchData(); // ペット情報のデータを取得するfetchData関数を呼び出します
  }, []); // このuseEffectは、最初のマウント時にのみ実行されます

  // selectedAccountに対応するペット情報をメモ化して取得します
  const selectedPetInfo = useMemo(() => {
    // petInfoの中からselectedAccountに対応するuseridを持つペット情報を配列で返します
    return pets.filter((pet) => pet.family_id === selectedAccount);
  }, [selectedAccount, pets]); // selectedAccountまたはpetsが変更されたときに再計算されます

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
        className="card flex flex-row max-w-sm m-4" // カードスタイルを定義したクラスを適用
        sx={{ margin: "0 auto" }} // カードを中央に配置
      >
        {/* selectedPetInfoが存在する場合はペット情報カードを表示し、存在しない場合はエラーメッセージを表示 */}
        {selectedPetInfo.length > 0 ? (
          <OnePetTodoCard petTodo={selectedPetInfo[0]} /> // 最初のペット情報をペット情報カードコンポーネントに渡して表示
        ) : (
          <p>アカウントを選んでください。</p> // ペット情報がない場合のメッセージ
        )}
      </Box>

      {/* 「今日のわんこ名言」を表示するポップアップを追加 */}
      <Popup_Today_Dog />
    </Box>
  );
}

// Slide_Mydogsコンポーネントを他のファイルで使用できるようにエクスポート
export default Slide_Mydogs;

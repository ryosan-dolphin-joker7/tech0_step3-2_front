"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, useContext } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import Popup_Today_Dog from "@/components/posts/popup_today_dog.jsx"; // ポップアップ用のコンポーネントをインポート
import OnePetTodoCard from "@/components/one_pet_todo_card.jsx"; // ペット情報カード用のコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート

function Slide_Mydogs() {
  // AccountContextからselectedAccountを取得します。
  const { selectedAccount } = useContext(AccountContext);

  // ペット情報を管理するstateを定義します。初期値はnullです。
  const [petTodo, setPetTodo] = useState(null);

  // ペット情報のリストを管理するためのstate。Supabaseから取得した全データを保存します。
  const [pets, setPets] = useState([]);

  // Supabaseからpetinformationテーブルのすべてのデータを取得する非同期関数
  const fetchData = async () => {
    try {
      const { data: petsData, error: petsError } = await supabase
        .from("petinformation") // petinformationテーブルからデータを取得
        .select("*"); // 全てのカラムを選択して取得

      if (petsError) throw petsError; // エラーが発生した場合は例外をスローします

      setPets(petsData || []); // 取得したデータをpets状態に保存します。データが空の場合は空の配列を設定します。
    } catch (error) {
      // データ取得に失敗した場合のエラーメッセージをコンソールに出力します。
      console.error("ペット情報の取得に失敗しました: " + error.message);
    }
  };

  // コンポーネントが最初に表示されるときに、fetchData関数を実行してデータを取得します。
  useEffect(() => {
    fetchData();
  }, []); // このuseEffectは、最初のマウント時にのみ実行されます。

  // selectedAccountが変更されたときに、対応するペット情報を設定するための処理
  useEffect(() => {
    if (selectedAccount && pets.length > 0) {
      // selectedAccountのIDに対応するペット情報を検索します。
      const selectedPet = pets.find((pet) => pet.petid === selectedAccount); // petidとselectedAccountが一致するペットを取得

      // 該当するペット情報が見つかった場合、その情報をpetTodoに設定します。見つからない場合はnullを設定します。
      setPetTodo(selectedPet || null);
    }
  }, [selectedAccount, pets]); // selectedAccountとpetsが変更されるたびにこの処理が実行されます。

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
        {/* petTodoが存在する場合はペット情報カードを表示し、存在しない場合はエラーメッセージを表示 */}
        {petTodo ? (
          <OnePetTodoCard petTodo={petTodo} /> // ペット情報カードコンポーネントを表示
        ) : (
          <p>アカウントを選んでください。</p> // ペット情報がない場合のメッセージ
        )}
      </Box>

      {/* 「今日の犬」を表示するポップアップを追加 */}
      <Popup_Today_Dog />
    </Box>
  );
}

// Slide_Mydogsコンポーネントを他のファイルで使用できるようにエクスポート
export default Slide_Mydogs;

"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useEffect, useState, useContext } from "react"; // Reactの基本機能とuseContextをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート
import { Box, Typography, Button, Divider, TextField } from "@mui/material"; // MUIのコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート
import OnePetInsuranceCard from "@/components/one_pet_insurance_card.jsx"; // ペット情報カード用のコンポーネントをインポート
import OnePetInfoCard from "@/components/one_pet_info_card"; // ペット情報カード用のコンポーネントをインポート

export default function Slide_pets() {
  // AccountContextからselectedAccountを取得します。
  const { selectedAccount } = useContext(AccountContext);

  // ペット情報を管理するstateを定義します。初期値はnullです。
  const [petInsurance, setPetInsurance] = useState(null);

  // ペット情報のリストを管理するためのstate。Supabaseから取得した全データを保存します。
  const [pets, setPets] = useState([]);

  // Supabaseからpetinformationテーブルのすべてのデータを取得する非同期関数
  const fetchData = async () => {
    try {
      const { data: petsData, error: petsError } = await supabase
        .from("insurance") // insuranceテーブルからデータを取得
        .select("*, petinformation(petname)"); // 全てのカラムを選択して取得

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

      // 該当するペット情報が見つかった場合、その情報をpetInsuranceに設定します。見つからない場合はnullを設定します。
      setPetInsurance(selectedPet || null);
    }
  }, [selectedAccount, pets]); // selectedAccountとpetsが変更されるたびにこの処理が実行されます。

  return (
    <Box
      sx={{
        display: "flex", // 子要素をフレックスボックスとして表示
        flexDirection: "column", // 子要素を縦に並べる
        alignItems: "center", // 子要素を中央に配置
        textAlign: "center", // テキストを中央揃え
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* 犬のカード情報などを表示する */}
        <Box
          className="card flex flex-row max-w-sm m-4" // カードスタイルを定義したクラスを適用
          sx={{ margin: "0 auto" }} // カードを中央に配置
        >
          {/* petInsuranceが存在する場合はペット情報カードを表示し、存在しない場合はエラーメッセージを表示 */}
          {petInsurance ? (
            <OnePetInsuranceCard petInsurance={petInsurance} /> // ペット情報カードコンポーネントを表示
          ) : (
            <p>アカウントを選んでください。</p> // ペット情報がない場合のメッセージ
          )}
        </Box>
      </div>
    </Box>
  );
}

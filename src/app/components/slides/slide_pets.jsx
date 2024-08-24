"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useEffect, useState, useContext, useMemo } from "react";
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート
import OnePetInsuranceCard from "@/components/one_pet_insurance_card.jsx"; // ペット保険情報カード用のコンポーネントをインポート
import OnePetInfoCard from "@/components/one_pet_info_card"; // ペット情報カード用のコンポーネントをインポート

export default function Slide_pets() {
  const { selectedAccount } = useContext(AccountContext); // AccountContextから選択されたアカウントIDを取得します

  const [insuranceInfoList, setInsuranceInfoList] = useState([]); // 保険情報を管理するためのstate。初期値は空の配列です
  const [petInfo, setPetInfo] = useState([]); // ペット情報を管理するためのstate。初期値は空の配列です
  const [fetchError, setFetchError] = useState(null); // データ取得が失敗した場合のエラーメッセージを管理するstate

  // Supabaseからinsuranceテーブルとpetinformationテーブルのデータを取得する非同期関数
  const fetchData = async () => {
    try {
      // insuranceテーブルからデータを取得し、関連するpetinformationテーブルのデータも取得
      const { data: insuranceData, error: insuranceError } =
        await supabase.from("insurance").select(`
          *,
          petinformation (
            family_id,
            petname
          )
        `);

      if (insuranceError) throw insuranceError; // エラーが発生した場合は例外をスロー

      setInsuranceInfoList(insuranceData || []); // 取得したデータをinsuranceInfoListに保存。データが空の場合は空の配列を設定

      // petinformationテーブルからデータを取得
      const { data: petInformationData, error: petInformationError } =
        await supabase.from("petinformation").select("*"); // 全てのカラムを選択してデータ取得

      if (petInformationError) throw petInformationError; // エラーが発生した場合は例外をスロー

      setPetInfo(petInformationData || []); // 取得したデータをpetInfoに保存。データが空の場合は空の配列を設定
    } catch (error) {
      console.error("データの取得に失敗しました: " + error.message); // エラーメッセージをコンソールに出力
      setFetchError("データの取得に失敗しました。"); // UIに表示するためのエラーメッセージを設定
    }
  };

  // コンポーネントが最初に表示されたときに、データを取得する
  useEffect(() => {
    fetchData(); // fetchData関数を呼び出してデータを取得
  }, []); // このuseEffectは、コンポーネントが最初にマウントされたときにのみ実行されます

  // selectedAccountに対応するすべてのペット情報を取得する
  const selectedPetInfo = useMemo(() => {
    return petInfo.filter((info) => info.family_id === selectedAccount);
    // petInfoの中からselectedAccountに対応するuseridを持つペット情報を配列で返します
  }, [selectedAccount, petInfo]); // selectedAccountまたはpetInfoが変更されたときに再計算されます

  // selectedAccountに対応するすべての保険情報を取得する
  const selectedInsuranceInfo = useMemo(() => {
    return insuranceInfoList.filter(
      (insurance) => insurance.petinformation.family_id === selectedAccount
    );
    // insuranceInfoListの中からselectedAccountに対応するuseridを持つ保険情報を配列で返します
  }, [selectedAccount, insuranceInfoList]); // selectedAccountまたはinsuranceInfoListが変更されたときに再計算されます

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
      {fetchError ? (
        <p>{fetchError}</p> // データ取得時のエラーが発生した場合はエラーメッセージを表示
      ) : (
        <div style={{ textAlign: "center" }}>
          {/* 複数のペット情報が存在する場合は、それぞれのペット情報カードを表示 */}
          {selectedPetInfo.length > 0 ? (
            selectedPetInfo.map((pet, index) => (
              <Box
                key={index} // 各ペット情報に対して一意のキーを設定
                className="card flex flex-row max-w-sm m-4"
                sx={{ margin: "0 auto" }} // カードを中央に配置
              >
                <OnePetInfoCard petInfo={pet} />
                {/* 複数のペット情報カードを表示 */}
              </Box>
            ))
          ) : (
            <p>該当するペット情報がありません。</p> // ペット情報がない場合のメッセージ
          )}

          {/* 複数の保険情報が存在する場合は、それぞれの保険情報カードを表示 */}
          {selectedInsuranceInfo.length > 0 ? (
            selectedInsuranceInfo.map((insurance, index) => (
              <Box
                key={index} // 各保険情報に対して一意のキーを設定
                className="card flex flex-row max-w-sm m-4"
                sx={{ margin: "0 auto" }} // カードを中央に配置
              >
                <OnePetInsuranceCard petInsurance={insurance} />
                {/* 複数の保険情報カードを表示 */}
              </Box>
            ))
          ) : (
            <p>保険情報がありません。</p> // 保険情報がない場合のメッセージ
          )}
        </div>
      )}
    </Box>
  );
}

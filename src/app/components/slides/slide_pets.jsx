"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useEffect, useState, useContext, useMemo } from "react";
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート
import OnePetInsuranceCard from "@/components/one_pet_insurance_card.jsx"; // ペット保険情報カード用のコンポーネントをインポート
import OnePetInfoCard from "@/components/one_pet_info_card"; // ペット情報カード用のコンポーネントをインポート

export default function Slide_pets() {
  const { selectedAccount } = useContext(AccountContext); // AccountContextから選択されたアカウントIDを取得

  const [insuranceInfoList, setInsuranceInfoList] = useState([]); // 保険情報を管理するためのstate
  const [petInfo, setPetInfo] = useState([]); // ペット情報を管理するためのstate
  const [fetchError, setFetchError] = useState(null); // データ取得が失敗した場合のエラーメッセージを管理するstate

  // APIからデータを取得する非同期関数
  const fetchData = async () => {
    try {
      // ペット情報を取得するためにAPIを呼び出します
      const petResponse = await fetch("/api/pet_info");
      if (!petResponse.ok) throw new Error("ペット情報の取得に失敗しました");

      const petData = await petResponse.json(); // JSON形式でデータを取得
      console.log("pet_info APIからのデータ:", petData); // デバッグ用にデータをコンソールに出力

      // ペット情報をstateに保存します
      const pets = Array.isArray(petData.pets) ? petData.pets : [];
      setPetInfo(pets);
    } catch (error) {
      console.error("ペット情報の取得に失敗しました: ", error.message);
      setFetchError("ペット情報の取得に失敗しました。");
    }

    try {
      // 保険情報を取得するためにAPIを呼び出します
      const insuranceResponse = await fetch("/api/pet_insurance");
      if (!insuranceResponse.ok)
        throw new Error("保険情報の取得に失敗しました");

      const insuranceData = await insuranceResponse.json(); // JSON形式でデータを取得
      console.log("pet_insurance APIからのデータ:", insuranceData); // デバッグ用にデータをコンソールに出力

      // 保険情報をstateに保存します
      const insurancedata = Array.isArray(insuranceData.insurancedata)
        ? insuranceData.insurancedata
        : [];
      setInsuranceInfoList(insurancedata);
    } catch (error) {
      console.error("保険情報の取得に失敗しました: ", error.message);
      setFetchError("保険情報の取得に失敗しました。");
    }
  };

  // コンポーネントが最初に表示されたときにfetchData関数を呼び出してデータを取得します
  useEffect(() => {
    fetchData();
  }, []); // このuseEffectは、コンポーネントが最初にマウントされたときにのみ実行されます

  // selectedAccountに対応するペット情報をフィルタリングして取得します
  const selectedPetInfo = useMemo(() => {
    return petInfo.filter((info) => info.family_id === selectedAccount);
  }, [selectedAccount, petInfo]); // selectedAccountまたはpetInfoが変更されたときに再計算されます

  // selectedAccountに対応する保険情報をフィルタリングして取得します
  const selectedInsuranceInfo = useMemo(() => {
    return insuranceInfoList.filter(
      (insurance) => insurance.petinformation.family_id === selectedAccount
    );
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
                {/* ペット情報カードを表示 */}
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
                {/* 保険情報カードを表示 */}
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

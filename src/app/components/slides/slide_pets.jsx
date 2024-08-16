"use client"; // このコードがクライアントサイドで動作することを指定

import React, { useEffect, useState, useContext, useMemo } from "react"; // Reactの基本機能とカスタムフックをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を提供するコンテキストをインポート
import OnePetInsuranceCard from "@/components/one_pet_insurance_card.jsx"; // ペット保険情報カード用のコンポーネントをインポート
import OnePetInfoCard from "@/components/one_pet_info_card"; // ペット情報カード用のコンポーネントをインポート

export default function Slide_pets() {
  // AccountContextから選択されたアカウントIDを取得します
  const { selectedAccount } = useContext(AccountContext);

  // 保険情報リストを管理するためのstate。初期値は空の配列（データなしの状態）
  const [insuranceInfoList, setInsuranceInfoList] = useState([]);

  // 個別のペット情報を管理するためのstate。初期値は空の配列（データなしの状態）
  const [petInfo, setPetInfo] = useState([]); // 空の配列で初期化

  // データ取得が失敗した場合のエラーメッセージを管理するstate。初期値はnull（エラーなしの状態）
  const [fetchError, setFetchError] = useState(null);

  // Supabaseからinsuranceテーブルとpetinformationテーブルのデータを取得する非同期関数
  const fetchData = async () => {
    try {
      // insuranceテーブルからデータを取得
      const { data: insuranceData, error: insuranceError } = await supabase
        .from("insurance")
        .select("*, petinformation(petname)"); // insuranceテーブルとpetinformationテーブルを関連付けてデータ取得

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

  // 選択されたアカウントIDに対応するペット保険情報を選択
  const selectedPetInsurance = useMemo(() => {
    return (
      insuranceInfoList.find((pet) => pet.petid === selectedAccount) || null
    );
    // insuranceInfoListの中からselectedAccountに対応するペット保険情報を探し、見つからない場合はnullを返します
  }, [selectedAccount, insuranceInfoList]); // selectedAccountまたはinsuranceInfoListが変更されたときに再計算されます

  // 選択されたアカウントIDに対応するペット情報を選択
  const selectedPetInfo = useMemo(() => {
    return petInfo.find((info) => info.petid === selectedAccount) || null;
    // petInfoの中からselectedAccountに対応するペット情報を探し、見つからない場合はnullを返します
  }, [selectedAccount, petInfo]); // selectedAccountまたはpetInfoが変更されたときに再計算されます

  return (
    <Box
      sx={{
        display: "flex", // 子要素をフレックスボックスとして表示
        flexDirection: "column", // 子要素を縦に並べる
        alignItems: "center", // 子要素を中央に配置
        textAlign: "center", // テキストを中央揃え
      }}
    >
      {/* データ取得時のエラーが発生した場合はエラーメッセージを表示 */}
      {fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <div style={{ textAlign: "center" }}>
          {/* ペット情報カードを表示するためのBoxコンポーネント */}
          <Box
            className="card flex flex-row max-w-sm m-4"
            sx={{ margin: "0 auto" }} // カードを中央に配置
          >
            {/* selectedPetInfoが存在する場合はペット情報カードを表示し、存在しない場合はメッセージを表示 */}
            {selectedPetInfo ? (
              <OnePetInfoCard petInfo={selectedPetInfo} />
            ) : (
              <p>アカウントを選んでください。</p> // ペット情報がない場合のメッセージ
            )}
          </Box>

          {/* ペット保険情報カードを表示するためのBoxコンポーネント */}
          <Box
            className="card flex flex-row max-w-sm m-4"
            sx={{ margin: "0 auto" }} // カードを中央に配置
          >
            {/* selectedPetInsuranceが存在する場合はペット保険情報カードを表示し、存在しない場合はメッセージを表示 */}
            {selectedPetInsurance ? (
              <OnePetInsuranceCard petInsurance={selectedPetInsurance} />
            ) : (
              <p>アカウントを選んでください。</p> // ペット保険情報がない場合のメッセージ
            )}
          </Box>
        </div>
      )}
    </Box>
  );
}

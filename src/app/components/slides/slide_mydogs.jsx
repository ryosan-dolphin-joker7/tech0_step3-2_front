"use client"; // クライアント側で動作するコードであることを指定しています。
import React, { useState, useEffect } from "react";
import Popup_Today_Dog from "@/components/posts/popup_today_dog.jsx"; // フッターコンポーネントをインポートしています。
import OnePetInfoCard from "@/components/one_pet_info_card.jsx"; // ペット情報カードコンポーネントをインポートしています。

// ペットのデータをシミュレート
const petData = {
  1: {
    pet_id: 1,
    pet_name: "マロン",
    birth_date: "2021/01/01",
    gender: "オス",
    breed: "ダックスフンド",
    weight: "5kg",
    favorite_food: "ささみ",
    photo_url: "/img/avatar.png", // ペットの画像のURL
  },
  2: {
    pet_id: 2,
    pet_name: "ココ",
    birth_date: "2020/05/15",
    gender: "メス",
    breed: "シーズー",
    weight: "4kg",
    favorite_food: "ドッグフード",
    photo_url: "/img/avatar_fall.png", // 別のペットの画像のURL
  },
};

function Slide_Mydogs({ petId }) {
  const [petInfo, setPetInfo] = useState(null); // ペットの情報を保存するためのstateを初期化します。

  // useEffectはコンポーネントがマウントされたとき、またはpetIdが変更されたときに実行されます。
  useEffect(() => {
    // petIdに基づいて適切なペットデータを取得
    const selectedPet = petData[petId];
    if (selectedPet) {
      setPetInfo(selectedPet); // 取得したペットの情報をstateに保存します。
    }
  }, [petId]); // petIdが変更されるたびにこのeffectが実行されます。

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 全体のコンテンツをセンター寄せ
        minHeight: "100vh", // ビューポートの高さ全体を占めるように設定
        textAlign: "center",
      }}
    >
      {/* カード形式でペットの情報を表示 */}
      <div
        className="card flex flex-row max-w-sm m-4"
        style={{ margin: "0 auto" }} // カードをセンター寄せにするためのスタイル
      >
        {petInfo ? (
          // ペットの情報が利用可能な場合にカードを表示
          <OnePetInfoCard petInfo={petInfo} />
        ) : (
          <p>Loading...</p> // ペットの情報がロードされていない場合に表示されるメッセージ
        )}
      </div>

      {/* 他のコンテンツを表示。ここでは「今日の犬」を表示するポップアップ */}
      <Popup_Today_Dog />
    </div>
  );
}

export default Slide_Mydogs;

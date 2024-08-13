"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, useContext } from "react"; // Reactの基本的なフックとコンテキストをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import Popup_Today_Dog from "@/components/posts/popup_today_dog.jsx"; // ポップアップ用のコンポーネントをインポート
import OnePetInfoCard from "@/components/one_pet_info_card.jsx"; // ペット情報カード用のコンポーネントをインポート
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート

// ペットのデータをオブジェクトとして定義します。これを使って表示する情報を管理します。
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
  3: {
    pet_id: 3,
    pet_name: "ラッキー",
    birth_date: "2019/07/23",
    gender: "オス",
    breed: "ゴールデンレトリバー",
    weight: "30kg",
    favorite_food: "チキン",
    photo_url: "/img/avatar_winter.png", // 新しいペットの画像のURL
  },
};

// Slide_Mydogsコンポーネントを定義します。このコンポーネントは、選択されたペットの情報を表示します。
function Slide_Mydogs() {
  // AccountContextからselectedAccountを取得します。これにより、どのアカウントが選択されているかが分かります。
  const { selectedAccount } = useContext(AccountContext);

  // ペット情報を管理するstateを定義します。初期値はnullです。
  const [petInfo, setPetInfo] = useState(null);

  // selectedAccountが変更されたとき、対応するペットの情報を設定します。
  useEffect(() => {
    // デフォルトで表示するペットのIDを設定します。
    const defaultPetId = 1;

    // selectedAccountが有効で、そのアカウントに対応するペットの情報がある場合、その情報を設定します。
    if (selectedAccount && petData[selectedAccount]) {
      setPetInfo(petData[selectedAccount]);
    } else {
      // selectedAccountが無効な場合、デフォルトのペット情報を設定します。
      setPetInfo(petData[defaultPetId]);
    }
  }, [selectedAccount]); // selectedAccountが変更されるたびにこの処理が実行されます。

  return (
    <Box
      sx={{
        display: "flex", // 子要素をフレックスボックスとして表示します
        flexDirection: "column", // 子要素を縦に並べます
        alignItems: "center", // 子要素を中央に配置します
        minHeight: "100vh", // 最小高さを画面全体に設定します
        textAlign: "center", // テキストを中央揃えにします
      }}
    >
      {/* 現在選択されているアカウントを表示します */}
      <p>選択されたアカウント: {selectedAccount ?? "未選択"}</p>

      <Box
        className="card flex flex-row max-w-sm m-4" // カードスタイルを定義したクラスを適用します
        sx={{ margin: "0 auto" }} // カードを中央に配置します
      >
        {/* ペット情報がある場合、それを表示します。なければエラーメッセージを表示します。 */}
        {petInfo ? (
          <OnePetInfoCard petInfo={petInfo} /> // ペット情報カードコンポーネントを表示
        ) : (
          <p>選択されたペット情報がありません。</p> // ペット情報がない場合のメッセージ
        )}
      </Box>

      {/* 「今日の犬」を表示するポップアップを追加 */}
      <Popup_Today_Dog />
    </Box>
  );
}

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default Slide_Mydogs;

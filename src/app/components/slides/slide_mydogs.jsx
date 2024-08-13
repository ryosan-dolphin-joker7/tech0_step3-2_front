"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Popup_Today_Dog from "@/components/posts/popup_today_dog.jsx";
import OnePetInfoCard from "@/components/one_pet_info_card.jsx";
import { AccountContext } from "@/components/AccountProvider"; // アカウントコンテキストをインポート

// 3つのペットのデータを定義
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

// Slide_Mydogsコンポーネントを定義
function Slide_Mydogs() {
  // AccountContextからselectedAccountを取得
  const { selectedAccount } = useContext(AccountContext);

  // ペットIDとペット情報を管理するstateを定義（初期値はnull）
  const [petId, setPetId] = useState(null);
  const [petInfo, setPetInfo] = useState(null);

  // 初期化時とselectedAccountが変更されたときに対応するpetIdを設定
  useEffect(() => {
    if (selectedAccount && petData[selectedAccount]) {
      setPetId(selectedAccount);
      setPetInfo(petData[selectedAccount]);
    } else {
      setPetId(1);
      setPetInfo(petData[2]);
    }
  }, [selectedAccount]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <p>選択されたアカウント: {selectedAccount}</p>
      <Box
        className="card flex flex-row max-w-sm m-4"
        sx={{ margin: "0 auto" }}
      >
        {petInfo ? (
          <OnePetInfoCard petInfo={petInfo} />
        ) : (
          <p>選択されたペット情報がありません。</p>
        )}
      </Box>
      {/* 「今日の犬」を表示するポップアップを追加 */}
      <Popup_Today_Dog />
    </Box>
  );
}

export default Slide_Mydogs;

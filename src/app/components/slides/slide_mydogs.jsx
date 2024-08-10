"use client";
import React from "react";
import Image from "next/image";
import Footer_Mydogs from "@/components/posts/popup_today_dog.jsx"; // フッターコンポーネントをインポートしています。

function Slide_Mydogs() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>ペットの名前</h2>
      {/* その他のコンテンツ */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src="/img/avatar.png" alt="avatar" width={150} height={150} />
      </div>
      <Footer_Mydogs />
      <div>
        <p>Pet Profile</p>
        <p>生年月日: 2021/01/01</p>
        <p>性別: オス</p>
        <p>種類: ダックスフンド</p>
        <p>体重: 5kg</p>
        <p>好きな食べ物: ささみ</p>
      </div>
    </div>
  );
}

export default Slide_Mydogs;

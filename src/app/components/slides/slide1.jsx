"use client";
import React from "react";
import Image from "next/image";

function Slide1() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>ペットの名前</h2>
      {/* その他のコンテンツ */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src="/img/avatar.png" alt="avatar" width={150} height={150} />
      </div>
    </div>
  );
}

export default Slide1;

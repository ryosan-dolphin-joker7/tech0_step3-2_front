"use client";
import React from "react";
import Image from "next/image";

function Slide1() {
  return (
    <div>
      <h2>ペットの名前</h2>
      {/* その他のコンテンツ */}
      <Image src="/img/avatar.png" alt="avatar" width={150} height={150} />
    </div>
  );
}

export default Slide1;

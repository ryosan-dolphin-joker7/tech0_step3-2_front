"use client";

import Link from "next/link";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";
import { useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState("light");

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4">
        <h1 className="text-center text-xl font-bold mb-6">だいじなこと</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/insurance">
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              <span className="text-center">保険証・会員証</span>
            </div>
          </Link>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">母子手帳</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">動物病院</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">トリミング</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">お気に入りフード</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">ペットホテル</span>
          </div>
          <div className="bg-gray-200 p-4 flex items-center justify-center opacity-50">
            <span className="text-center">ドッグラン</span>
          </div>
          <Link href="/reservations">
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              <span className="text-center">予約一覧</span>
            </div>
          </Link>
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
}

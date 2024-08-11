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
        <h1 className="text-center text-2xl font-extrabold mb-8 mt-20">
          だいじなこと
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link href="/insurance">
            <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transform transition duration-200 flex flex-col justify-center items-center">
              <img
                src="/img/icon_card.png"
                alt="保険証・会員証"
                className="w-12 h-12 mx-auto mb-4"
              />
              <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                保険証・会員証
              </h5>
            </div>
          </Link>

          {/* 以下、他のカードも同様に設定 */}
          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_pocketbook.png"
              alt="母子手帳"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              母子手帳
            </h5>
          </div>

          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_hospital.png"
              alt="動物病院"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              動物病院
            </h5>
          </div>
          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_scissors.png"
              alt="トリミング"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              トリミング
            </h5>
          </div>
          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_dogfood.png"
              alt="お気に入りフード"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              お気に入りフード
            </h5>
          </div>
          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_hotel.png"
              alt="ペットホテル"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              ペットホテル
            </h5>
          </div>
          <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50 flex flex-col justify-center items-center">
            <img
              src="/img/icon_dog.png"
              alt="ドッグラン"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              ドッグラン
            </h5>
          </div>

          <Link href="/reservations">
            <div className="w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transform transition duration-200 flex flex-col justify-center items-center">
              <img
                src="/img/icon_checksheet.png"
                alt="予約一覧"
                className="w-12 h-12 mx-auto mb-4"
              />
              <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                予約一覧
              </h5>
            </div>
          </Link>
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
}

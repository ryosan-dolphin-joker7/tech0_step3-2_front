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
            <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transform transition duration-200">
              <svg
                className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                保険証・会員証
              </h5>
              <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                保険証や会員証の管理はこちらからどうぞ。
              </p>
              <span className="block text-center text-blue-600 hover:underline">
                詳細を見る
              </span>
            </div>
          </Link>

          {/* 以下、他のカードも同様に設定 */}
          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              母子手帳
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              母子手帳の情報を管理します。
            </p>
          </div>

          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              動物病院
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              動物病院の情報を管理します。
            </p>
          </div>

          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              トリミング
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              トリミングの予約管理はこちらから。
            </p>
          </div>

          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              お気に入りフード
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              お気に入りのフード情報を管理します。
            </p>
          </div>

          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              ペットホテル
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              ペットホテルの予約管理はこちらから。
            </p>
          </div>

          <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 opacity-50">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
              ドッグラン
            </h5>
            <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
              ドッグランの予約管理はこちらから。
            </p>
          </div>

          <Link href="/reservations">
            <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transform transition duration-200">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                予約一覧
              </h5>
              <p className="mb-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                すべての予約の一覧を表示します。
              </p>
              <span className="block text-center text-blue-600 hover:underline">
                詳細を見る
              </span>
            </div>
          </Link>
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
}

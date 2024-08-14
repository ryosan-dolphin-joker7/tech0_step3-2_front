"use client";

import Link from "next/link";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";
import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

// カードコンポーネントの定義
const Card = ({ href, src, alt, title, isLink = true, opacity = false }) => {
  const cardContent = (
    <div
      className={classNames(
        "w-full h-40 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center",
        { "hover:shadow-xl transform transition duration-200": isLink },
        { "opacity-50": opacity }
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="w-12 h-12 mx-auto mb-4"
      />
      <h5 className="mb-2 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
        {title}
      </h5>
    </div>
  );

  return isLink ? <Link href={href}>{cardContent}</Link> : cardContent;
};

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
          <Card
            href="/insurance"
            src="/img/icon_card.png"
            alt="保険証・会員証"
            title="保険証・会員証"
          />
          <Card
            src="/img/icon_pocketbook.png"
            alt="母子手帳"
            title="母子手帳"
            isLink={false}
            opacity={true}
          />
          <Card
            src="/img/icon_hospital.png"
            alt="動物病院"
            title="動物病院"
            isLink={false}
            opacity={true}
          />
          <Card
            src="/img/icon_scissors.png"
            alt="トリミング"
            title="トリミング"
            isLink={false}
            opacity={true}
          />
          <Card
            src="/img/icon_dogfood.png"
            alt="お気に入りフード"
            title="お気に入りフード"
            isLink={false}
            opacity={true}
          />
          <Card
            src="/img/icon_hotel.png"
            alt="ペットホテル"
            title="ペットホテル"
            isLink={false}
            opacity={true}
          />
          <Card
            src="/img/icon_dog.png"
            alt="ドッグラン"
            title="ドッグラン"
            isLink={false}
            opacity={true}
          />
          <Card
            href="/reservations"
            src="/img/icon_checksheet.png"
            alt="予約一覧"
            title="予約一覧"
          />
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
}

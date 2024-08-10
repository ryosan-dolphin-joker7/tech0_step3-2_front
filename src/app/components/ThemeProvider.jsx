"use client"; // クライアント側で動作するコンポーネントとして指定

import React, { useEffect, useState } from "react";

// クライアントサイドのテーマ管理用コンポーネントを定義
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // 初期テーマをローカルストレージから取得して適用する
  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  // テーマを切り替える関数を定義
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme); // 新しいテーマをローカルストレージに保存
  };

  return (
    <>
      {/* 子コンポーネントにテーマとテーマ切り替え関数を渡す */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { theme, toggleTheme })
      )}
    </>
  );
}

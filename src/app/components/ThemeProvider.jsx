"use client"; // クライアント側で動作するコンポーネントとして指定

import React, { useEffect, useState } from "react";

// クライアントサイドのテーマ管理用コンポーネントを定義
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // クライアントサイドでのみテーマの適用を行うためにuseEffectを使用します
  useEffect(() => {
    // ユーザーのテーマ設定がローカルストレージに保存されているか確認し、それを適用します
    const storedTheme = window.localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    // クライアントサイドでhtml要素にdata-theme属性を追加してテーマを設定します
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []); // 空の依存配列を指定することで、コンポーネントのマウント時にのみ実行されます

  return <>{children}</>; // children（レイアウトやページコンテンツ）をそのままレンダリング
}

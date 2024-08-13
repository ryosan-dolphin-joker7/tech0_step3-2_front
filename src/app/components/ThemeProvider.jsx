"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, createContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

// テーマの状態と切り替え関数を他のコンポーネントで使えるようにするためのコンテキストを作成
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  // テーマの状態を管理する state を作成し、初期値は "light"
  const [theme, setTheme] = useState("light");

  // テーマを切り替えるための関数
  const toggleTheme = () => {
    // 現在のテーマが "light" なら "dark" に、"dark" なら "light" に切り替える
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // 新しいテーマを状態にセット
  };

  // テーマが変更されたら、HTMLタグに data-theme 属性を設定する
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); // theme が変わるたびにこの処理が実行される

  // MUI のテーマを作成
  const muiTheme = createTheme({
    palette: {
      mode: theme, // MUI のテーマモード (light/dark) を設定
    },
  });

  return (
    // テーマの状態と切り替え関数を他のコンポーネントで使えるように、コンテキストでラップする
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* MUI のテーマプロバイダーで子コンポーネントをラップ */}
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

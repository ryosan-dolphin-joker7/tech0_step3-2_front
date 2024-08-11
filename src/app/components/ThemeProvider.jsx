"use client"; // このファイルがクライアントサイドで動作することを指定

import React, { useState, useEffect, createContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

// テーマの状態と切り替え関数を他のコンポーネントに提供するためのコンテキストを作成
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // テーマの初期状態を"light"に設定

  // テーマを切り替えるための関数
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // テーマが変更されるたびに、`data-theme`属性を設定
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // MUIのテーマを動的に作成
  const muiTheme = createTheme({
    palette: {
      mode: theme, // MUIのテーマモードを設定（ライト/ダーク）
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

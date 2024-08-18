"use client"; // このファイルがクライアントサイドで動作することを指定

// Reactと必要なフックをインポートします
import React, { Suspense } from "react";

// Google FontsからInterフォントをインポートします
import { Inter } from "next/font/google";

// MUIとNext.jsのAppRouter用のキャッシュプロバイダーをインポートします
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// アプリ全体で使用するヘッダー、フッター、テーマプロバイダー、アカウントプロバイダーをインポートします
import Header from "@/app/components/header.jsx";
import Footer from "@/app/components/footer.jsx";
import ThemeProvider from "@/app/components/ThemeProvider";
import { AccountProvider } from "@/app/components/AccountProvider";

// グローバルスタイル（CSS）をインポートします
import "./globals.css";

// ローディング画面用のコンポーネントをインポートします
import Loading from "./loading"; // コンポーネント名を大文字に変更

// Google FontsのInterフォントを使用する設定を行います
const inter = Inter({ subsets: ["latin"] });

// RootLayoutコンポーネントを定義します
// このコンポーネントは、アプリケーション全体のレイアウトを定義し、
// すべてのページコンテンツをラップします
export default function RootLayout({ children }) {
  return (
    // HTMLのlang属性でページの言語を日本語に設定します
    <html lang="ja">
      <head>
        {/* ページの文字コードをUTF-8に設定します */}
        <meta charSet="UTF-8" />

        {/* モバイルデバイス向けにページの表示を最適化するための設定を行います */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ページの説明文を設定します。SEOなどに役立ちます */}
        <meta name="description" content="Generated by Team Black 24h" />

        {/* ブラウザのタブに表示されるページのタイトルを設定します */}
        <title>OnePushAPP</title>
      </head>
      <body className={inter.className}>
        {/* ThemeProviderでアプリ全体のテーマを管理します */}
        <ThemeProvider>
          {/* AccountProviderでアカウントの状態を管理します */}
          <AccountProvider>
            {/* ヘッダーコンポーネントを表示します */}
            <Header />

            {/* AppRouterCacheProviderでページのキャッシュ管理を行います */}
            <AppRouterCacheProvider>
              {/* Suspenseを使用して非同期にロードされるコンポーネントの読み込み中にローディング画面を表示します */}
              <Suspense fallback={<Loading />}>
                {/* ページのメインコンテンツを表示します */}
                {children}
              </Suspense>
            </AppRouterCacheProvider>

            {/* フッターコンポーネントを表示します */}
            <Footer />
          </AccountProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

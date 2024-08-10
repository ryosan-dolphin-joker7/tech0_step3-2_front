"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import "@/components/LoadingScreen.module.css"; // CSSをインポートしています。
import ".//globals.css"; // CSSをインポートしています。

import LoadingScreen from "@/components/LoadingScreen"; // ローディング画面のコンポーネントをインポート
import { SwiperTab } from "@/components/swiper"; // スワイパーを表示するコンポーネントをインポートしています。

export default function Page() {
  const [items, setItems] = useState([]); // 顧客情報のリストを保持するためのstateを定義しています。
  const [talks, setTalks] = useState([]); // talks情報のリストを保持するためのstateを定義しています。
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。
  const [isLoading, setIsLoading] = useState(true); // ページのロード状態を管理するstate
  const [isContentVisible, setIsContentVisible] = useState(false); // コンテンツの表示状態を管理するstate

  // コンポーネントがマウントされたときにデータを取得するためのuseEffectフック
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*");
      if (tasksError) throw tasksError;

      const { data: talksData, error: talksError } = await supabase
        .from("talks")
        .select("*");
      if (talksError) throw talksError;

      setItems(tasksData || []);
      setTalks(talksData || []);
    } catch (error) {
      console.error("データの取得に失敗しました: " + error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsContentVisible(true), 500); // ローディング完了後にコンテンツをフェードイン
    }
  };

  if (isLoading) {
    return <LoadingScreen minimumLoadingTime={10000} />; // ローディング画面を表示
  }

  return (
    <div className={isContentVisible ? "fade-in" : "hidden"}>
      <Header
        theme={theme}
        toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div style={{ paddingTop: "30px", paddingBottom: "60px" }}>
        {/* スワイパーコンポーネントを表示 */}
        <div>
          <SwiperTab />
        </div>
      </div>
    </div>
  );
}

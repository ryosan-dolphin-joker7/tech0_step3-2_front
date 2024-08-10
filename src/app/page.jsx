"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートしています。
import OnePostInfoCard from "@/components/one_post_info_card.jsx"; // カスタマー情報カードコンポーネントをインポートしています。
import Header from "@/components/header.jsx"; // ヘッダーコンポーネントをインポートしています。
import Footer from "@/components/footer.jsx"; // フッターコンポーネントをインポートしています。
import Footer_Post from "@/components/footer_post.jsx"; // フッターコンポーネントをインポートしています。

// スワイパーを表示するコンポーネントをインポートしています。
import { SwiperTab } from "@/components/swiper";

// 顧客情報を表示するページコンポーネントを定義しています。
export default function Page() {
  const [items, setItems] = useState([]); // 顧客情報のリストを保持するためのstateを定義しています。
  const [talks, setTalks] = useState([]); // talks情報のリストを保持するためのstateを定義しています。
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを定義しています。

  // コンポーネントがマウントされたときにデータを取得するためのuseEffectフック
  useEffect(() => {
    fetchData();
  }, []);

  // テーマが変更されたときに、HTML要素にテーマを設定するためのuseEffectフック
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Supabaseから顧客情報とtalksを取得する非同期関数
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
    }
  };

  // UIのテーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 顧客情報を表示するコンポーネントをレンダリングしています。
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div style={{ paddingTop: "30px", paddingBottom: "60px" }}>
        {/* スワイパーコンポーネントを表示 */}
        <div>
          <SwiperTab />
        </div>
      </div>
      <Footer_Post theme={theme} />
    </>
  );
}

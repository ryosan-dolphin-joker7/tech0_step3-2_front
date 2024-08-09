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
  const [error, setError] = useState(null); // エラーメッセージを保持するためのstateを定義しています。
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
      setError("データの取得に失敗しました: " + error.message);
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
        {/* 顧客情報カードをグリッドレイアウトで表示 */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          {items.map((taskInfo) => {
            const relatedTalks = talks.filter(
              (talk) => talk.task_id === taskInfo.task_id
            );
            return (
              <div
                key={taskInfo.task_id}
                className={`card bordered border-blue-200 border-2 flex flex-row max-w-sm m-4 ${
                  theme === "light" ? "bg-white" : "bg-gray-200"
                }`}
              >
                <OnePostInfoCard taskInfo={taskInfo} talks={relatedTalks} />
              </div>
            );
          })}
        </div>

        <h1>ここから下はテスト用に作っているコンポーネントの表示画面へ</h1>
        <div className="p-4">
          <Link href="/test_component" className="mt-4 pt-4" prefetch={false}>
            <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
              Test_Component
            </button>
          </Link>
        </div>
      </div>
      <Footer_Post theme={theme} />
      <Footer theme={theme} />
    </>
  );
}

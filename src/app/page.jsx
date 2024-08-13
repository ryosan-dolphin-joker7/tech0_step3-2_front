"use client"; // クライアント側で動作するコードであることを指定します。
import Link from "next/link"; // ページ間のリンクを作成するためのコンポーネントをインポート。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポート。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート。
import LoadingScreen from "@/components/LoadingScreen"; // ローディング画面のコンポーネントをインポート。
import { SwiperTab } from "@/components/swiper"; // スワイパータブを表示するコンポーネントをインポート。
import "@/components/LoadingScreen.module.css"; // ローディング画面用のCSSをインポート。
import "./globals.css"; // グローバルスタイルをインポート（Tailwind CSSを含む）。

export default function Page({ selectedAccount }) {
  const [items, setItems] = useState([]); // タスクのリストを保持するためのstate。
  const [talks, setTalks] = useState([]); // トーク情報のリストを保持するためのstate。
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理するstate。
  const [isContentVisible, setIsContentVisible] = useState(false); // コンテンツの表示状態を管理するstate。

  // コンポーネントがマウントされたときにデータを取得するためのuseEffectフック。
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Supabaseからタスクデータを取得
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*");
        if (tasksError) throw tasksError;

        // Supabaseからトークデータを取得
        const { data: talksData, error: talksError } = await supabase
          .from("talks")
          .select("*");
        if (talksError) throw talksError;

        // 取得したデータをstateにセット
        setItems(tasksData || []);
        setTalks(talksData || []);
      } catch (error) {
        // エラーメッセージをコンソールに表示
        console.error("データの取得に失敗しました: " + error.message);
      } finally {
        // ローディング完了後に表示を更新
        setIsLoading(false);
        // コンテンツをフェードインで表示
        setTimeout(() => setIsContentVisible(true), 500);
      }
    };

    fetchData();
  }, []); // 空の依存配列により、コンポーネントの初回マウント時のみ実行。

  // ローディング状態であれば、ローディング画面を表示。
  if (isLoading) {
    return <LoadingScreen minimumLoadingTime={10000} />; // ローディング画面を表示。
  }

  return (
    <div className={isContentVisible ? "fade-in" : "hidden"}>
      {/* コンテンツの外枠。パディングで上下に余白を確保 */}
      <div className="pt-8 pb-16">
        {/* スワイパータブコンポーネントを表示 */}
        <SwiperTab selectedAccount={selectedAccount} />{" "}
        {/* selectedAccountをSwiperTabに渡す */}
      </div>
    </div>
  );
}

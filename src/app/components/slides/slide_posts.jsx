"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートしています。
import OnePostInfoCard from "@/app/components/one_post_info_card.jsx"; // カスタマー情報カードコンポーネントをインポートしています。

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

  // 顧客情報を表示するコンポーネントをレンダリングしています。
  return (
    <>
      {/* コンテンツ領域。ヘッダーとフッターのスペースを確保するためのパディングを追加 */}
      <div>
        {/* スワイパーコンポーネントを表示 */}

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
      </div>
    </>
  );
}

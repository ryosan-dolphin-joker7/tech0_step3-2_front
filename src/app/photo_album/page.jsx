"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートしています。
import OnePostInfoCard from "@/components/one_post_info_card.jsx"; // 顧客情報カードコンポーネントをインポートしています。
import Footer_Post from "@/components/footer_post.jsx"; // フッターコンポーネントをインポートしています。

// 顧客情報のリストを表示するための小コンポーネントを定義します。
function TaskList({ items, talks, theme }) {
  return items.map((taskInfo) => {
    // 顧客情報に関連するトーク情報をフィルタリングして取得します。
    const relatedTalks = talks.filter(
      (talk) => talk.task_id === taskInfo.task_id
    );
    return (
      <div
        key={taskInfo.task_id} // ユニークなキーで各カードを識別します。
        className={`card bordered border-blue-200 border-2 flex flex-row max-w-sm m-4 ${
          theme === "light" ? "bg-white" : "bg-gray-200"
        }`}
      >
        <OnePostInfoCard taskInfo={taskInfo} talks={relatedTalks} />
      </div>
    );
  });
}

// 顧客情報を表示するページコンポーネントを定義しています。
export default function Page() {
  const [items, setItems] = useState([]); // 顧客情報のリストを保持するためのstateを初期化します。
  const [talks, setTalks] = useState([]); // talks情報のリストを保持するためのstateを初期化します。
  const [theme, setTheme] = useState("light"); // 現在のテーマ（ライトモードまたはダークモード）を保持するためのstateを初期化します。

  // コンポーネントがマウントされたときにデータを取得するためのuseEffectフック
  useEffect(() => {
    fetchData();
  }, []); // このuseEffectは、最初のマウント時にのみ実行されます。

  // テーマが変更されたときに、HTML要素にテーマを設定するためのuseEffectフック
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); // テーマが変更されたときにこのuseEffectが実行されます。

  // Supabaseから顧客情報とtalksを取得する非同期関数
  const fetchData = async () => {
    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*"); // Supabaseからtasksデータを取得します。
      if (tasksError) throw tasksError; // エラーが発生した場合は例外をスローします。

      const { data: talksData, error: talksError } = await supabase
        .from("talks")
        .select("*"); // Supabaseからtalksデータを取得します。
      if (talksError) throw talksError; // エラーが発生した場合は例外をスローします。

      setItems(tasksData || []); // 取得したデータをstateに保存します。データが空の場合は空の配列を設定します。
      setTalks(talksData || []); // 取得したデータをstateに保存します。データが空の場合は空の配列を設定します。
    } catch (error) {
      console.error("データの取得に失敗しました: " + error.message); // エラーメッセージをコンソールに出力します。
    }
  };

  return (
    <>
      <div>
        {/* 顧客情報カードをグリッドレイアウトで表示 */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          {/* 顧客情報リストを表示するためのコンポーネントを呼び出します */}
          <TaskList items={items} talks={talks} theme={theme} />
        </div>

        {/* フッターコンポーネントを中央に配置して表示 */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
            textAlign: "center",
            backgroundColor: theme === "light" ? "#fff" : "#333", // 背景色をテーマに応じて設定
            color: theme === "light" ? "#000" : "#fff",
          }}
        >
          <Footer_Post />
        </div>
      </div>
    </>
  );
}

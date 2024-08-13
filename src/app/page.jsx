"use client"; // このファイルがクライアントサイドで実行されることを明示します。

// 必要なモジュールやコンポーネントをインポートします。
import Link from "next/link"; // Next.jsのページ間のリンクを作成するためのコンポーネント。
import { useEffect, useState, useContext } from "react"; // Reactのフック（useEffect, useState, useContext）をインポートします。
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポートします。これはデータベースにアクセスするために使用されます。
import LoadingScreen from "@/components/LoadingScreen"; // ローディング中に表示される画面のコンポーネント。
import { SwiperTab } from "@/components/swiper"; // スワイプ可能なタブを表示するコンポーネント。
import "@/components/LoadingScreen.module.css"; // ローディング画面用のCSSファイルをインポート。
import "./globals.css"; // 全体に適用されるグローバルなCSSスタイルをインポートします（Tailwind CSSを使用）。

// アカウントの情報を共有するためのコンテキストをインポートします。
import { AccountContext } from "@/components/AccountProvider";

// Pageコンポーネントの定義
export default function Page({}) {
  // AccountContextから現在選択されているアカウント情報を取得します。
  const { selectedAccount } = useContext(AccountContext);

  // 状態を管理するための変数を宣言します。
  const [items, setItems] = useState([]); // タスクのリストを保持するためのstate。初期値は空の配列です。
  const [talks, setTalks] = useState([]); // トーク情報のリストを保持するためのstate。初期値は空の配列です。
  const [isLoading, setIsLoading] = useState(true); // データが読み込まれているかどうかを示すstate。初期値はtrue（読み込み中）。
  const [isContentVisible, setIsContentVisible] = useState(false); // コンテンツが表示されるかどうかを管理するstate。初期値はfalse（非表示）。

  // コンポーネントが初めて表示されたときに実行される処理を定義します。
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Supabaseを使ってタスクデータをデータベースから取得します。
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*");
        if (tasksError) throw tasksError; // エラーが発生した場合は例外を投げます。

        // Supabaseを使ってトークデータをデータベースから取得します。
        const { data: talksData, error: talksError } = await supabase
          .from("talks")
          .select("*");
        if (talksError) throw talksError; // エラーが発生した場合は例外を投げます。

        // 取得したデータをstateに保存します。
        setItems(tasksData || []); // タスクデータをstateにセットします。データが無い場合は空の配列をセットします。
        setTalks(talksData || []); // トークデータをstateにセットします。データが無い場合は空の配列をセットします。
      } catch (error) {
        // データ取得中にエラーが発生した場合にコンソールにエラーメッセージを表示します。
        console.error("データの取得に失敗しました: " + error.message);
      } finally {
        // データの取得が完了したら、ローディング状態を終了し、コンテンツをフェードインで表示します。
        setIsLoading(false); // ローディング状態を解除します。
        setTimeout(() => setIsContentVisible(true), 500); // 500ミリ秒後にコンテンツを表示するように設定します。
      }
    };

    // fetchData関数を実行します。
    fetchData();
  }, []); // 空の依存配列を渡すことで、コンポーネントが初回マウント時のみ実行されるようにします。

  // ローディング中であれば、ローディング画面を表示します。
  if (isLoading) {
    return <LoadingScreen minimumLoadingTime={10000} />; // ローディング画面を表示。最低でも10秒は表示します。
  }

  // データのロードが完了した後、コンテンツを表示します。
  return (
    <div className={isContentVisible ? "fade-in" : "hidden"}>
      {/* コンテンツ全体の外枠。上部と下部にパディング（余白）を設定 */}
      <div className="pt-8 pb-16">
        {/* スワイパータブコンポーネントを表示し、selectedAccountをプロパティとして渡します。 */}
        <SwiperTab selectedAccount={selectedAccount} />
      </div>
    </div>
  );
}

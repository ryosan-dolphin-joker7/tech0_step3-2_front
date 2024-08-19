"use client"; // このファイルがクライアントサイドで実行されることを示します。

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/app/supabaseClient"; // Supabaseクライアントをインポートして、データベースとの通信を行います。
import LoadingScreen from "@/components/LoadingScreen"; // ローディング画面を表示するためのコンポーネントをインポートします。
import { SwiperTab } from "@/components/swiper"; // スワイプ可能なタブを表示するコンポーネントをインポートします。
import "@/components/LoadingScreen.module.css"; // ローディング画面用のCSSスタイルをインポートします。
import "./globals.css"; // グローバルなCSSスタイルをインポートします。

import { AccountContext } from "@/components/AccountProvider"; // アカウント情報を共有するためのコンテキストをインポートします。
import LoginPrompt from "@/components/LoginPrompt"; // ログインプロンプトを表示するためのコンポーネントをインポートします。
import { useSession } from "next-auth/react"; // NextAuth.jsからセッション情報を取得するためのフックをインポートします。

export default function Page() {
  // useSessionフックを使って、現在のセッション情報とそのステータスを取得します。
  const { data: session, status } = useSession();

  // AccountContextから現在選択されているアカウント情報を取得します。
  const { selectedAccount } = useContext(AccountContext);

  // 状態を管理するための変数を定義します。
  const [items, setItems] = useState([]); // タスクのリストを保持するstate。
  const [talks, setTalks] = useState([]); // トーク情報のリストを保持するstate。
  const [isLoading, setIsLoading] = useState(true); // データが読み込まれているかどうかを示すstate。
  const [isContentVisible, setIsContentVisible] = useState(false); // コンテンツが表示されるかどうかを管理するstate。

  // セッション情報が変更されたときにログを出力します（デバッグ用）。
  useEffect(() => {
    console.log("Session status:", status); // 現在のセッションステータスを表示
    console.log("Session data:", session); // セッションデータを表示
  }, [session, status]); // sessionとstatusが変更されるたびに実行されます。

  // データのフェッチ処理を行うuseEffect
  useEffect(() => {
    // 非同期でデータを取得する関数を定義します。
    const fetchData = async () => {
      try {
        // tasksテーブルからデータを取得します。
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*");
        if (tasksError) throw tasksError; // エラーが発生した場合は例外をスローします。

        // talksテーブルからデータを取得します。
        const { data: talksData, error: talksError } = await supabase
          .from("talks")
          .select("*");
        if (talksError) throw talksError; // エラーが発生した場合は例外をスローします。

        // 取得したデータをstateに保存します。
        setItems(tasksData || []); // tasksDataがnullまたはundefinedの場合は空の配列をセットします。
        setTalks(talksData || []); // talksDataがnullまたはundefinedの場合は空の配列をセットします。
      } catch (error) {
        // データ取得中にエラーが発生した場合にエラーメッセージをコンソールに出力します。
        console.error("データの取得に失敗しました: " + error.message);
      } finally {
        // データ取得後にローディング状態を解除し、コンテンツを遅延表示します。
        setIsLoading(false); // ローディング状態を解除します。
        setTimeout(() => setIsContentVisible(true), 500); // 500ms後にコンテンツを表示します。
      }
    };

    // ユーザーが認証されている場合のみ、データをフェッチします。
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]); // 認証状態が変わるたびにデータをフェッチします。

  // 認証状態に応じて表示するコンテンツを切り替えます。

  // ローディング中であればローディング画面を表示します。
  if (status === "loading") {
    return <LoadingScreen minimumLoadingTime={10000} />;
  }

  // 未認証状態の場合は、ログインプロンプトを表示します。
  if (status === "unauthenticated") {
    return <LoginPrompt />;
  }

  // 認証されており、データのロードが完了した後にコンテンツを表示します。
  if (!isLoading && session) {
    return (
      <div className={isContentVisible ? "fade-in" : "hidden"}>
        <div className="pt-8 pb-16">
          <SwiperTab selectedAccount={selectedAccount} />
        </div>
      </div>
    );
  }

  // ローディング中または認証状態が不明な場合は何も表示しません。
  return null;
}

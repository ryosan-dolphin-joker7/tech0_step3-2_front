"use client"; // クライアント側で動作するコードであることを指定しています。
import OneCustomerInfoCard from "../components/one_customer_info_card.jsx"; // 顧客情報を表示するコンポーネントをインポートしています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "../supabaseClient"; // Supabaseクライアントをインポートしています。

// 顧客情報を表示するページコンポーネントを定義しています。
export default function Page() {
  const [items, setItems] = useState([]); // 顧客情報を格納するための状態を初期化しています。
  const [error, setError] = useState(null); // エラーメッセージを格納するための状態を初期化しています。

  // データを取得する非同期関数を定義しています。
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*"); // Supabaseからタスクデータを取得しています。

      if (error) {
        setError("データの取得に失敗しました"); // データ取得に失敗した場合、エラーメッセージを設定します。
      } else {
        setItems(data); // データ取得に成功した場合、状態にデータを設定します。
      }
    } catch (fetchError) {
      setError("データの取得中にエラーが発生しました"); // データ取得中に例外が発生した場合、エラーメッセージを設定します。
    }
  };

  // コンポーネントがマウントされたときにデータを取得するためのuseEffectフックを設定しています。
  useEffect(() => {
    fetchData();
  }, []); // 空の依存配列を渡すことで、一度だけ実行されるようにしています。

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}{" "}
      {/* エラーメッセージがある場合、表示します。 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* タスク情報をマッピングして、それぞれの情報をカード形式で表示します。 */}
        {items.map((taskInfo) => (
          <div
            key={taskInfo.id} // タスクの一意なIDを使用してキーを設定しています。
            className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4"
          >
            <OneCustomerInfoCard {...taskInfo} />{" "}
            {/* 顧客情報を表示するコンポーネントをレンダリングしています。 */}
            <div className="card-body flex flex-col justify-between">
              <Link href={`/customers/read/${taskInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Read
                </button>
              </Link>
              <Link href={`/customers/update/${taskInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Update
                </button>
              </Link>
              <Link href={`/customers/delete/${taskInfo.customer_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

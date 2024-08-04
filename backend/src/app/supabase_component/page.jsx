"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。

// 顧客情報を表示するページコンポーネントを定義しています。
export default function Page() {
  // 顧客情報を表示するコンポーネントをレンダリングしています。
  return (
    <>
      <h1>Supabaseを使ったコンポーネントのテスト画面</h1>
      <div className="p-4">
        <Link href="/photo" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Supabase_Photo_data
          </button>
        </Link>
      </div>
      <div className="p-4">
        <Link href="/table" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Supabase_Table_data
          </button>
        </Link>
      </div>
      <div className="p-4">
        <Link href="/tasks" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Supabase_Task_data
          </button>
        </Link>
      </div>
      <div className="p-4">
        <Link href="/todo" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Supabase_todo_data
          </button>
        </Link>
      </div>

      <div>
        <Link href="/">
          <button className="btn btn-primary m-4 text-2xl">戻る</button>
        </Link>
      </div>
    </>
  );
}

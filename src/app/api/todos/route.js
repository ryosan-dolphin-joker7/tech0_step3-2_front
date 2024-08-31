import { createServerSupabaseClient } from "@/app/supabaseServer"; // サーバーサイドのSupabaseクライアントをインポート
import { NextResponse } from "next/server";

// サーバーサイド専用のSupabaseクライアントを作成する関数
const supabase = createServerSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // セキュアなサービスロールキーを使用
);

export async function GET(req) {
  // クエリパラメータからselectedAccountを取得
  const { searchParams } = new URL(req.url);
  const selectedAccount = searchParams.get("selectedAccount");

  try {
    // Supabaseからtodosデータを取得
    const { data, error } = await supabase
      .from("todos")
      .select(
        `
        *,
        assignee:userinformation!todos_assignee_user_id_fkey (user_name,family_id),
        completer:userinformation!todos_completer_user_id_fkey (user_name,family_id)
      `
      )
      .eq("assignee.family_id", selectedAccount);

    // エラーハンドリング
    if (error) {
      throw error;
    }

    // データを返す
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}

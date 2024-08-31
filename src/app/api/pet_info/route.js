import { createServerSupabaseClient } from "@/app/supabaseServer"; // サーバーサイドのSupabaseクライアントをインポート
import { NextResponse } from "next/server"; // Next.jsのレスポンスオブジェクトをインポート

export async function GET() {
  // GETリクエストを処理
  const supabase = createServerSupabaseClient();

  // Supabaseからデータを取得
  const { data: petsData, error } = await supabase
    .from("petinformation") // petinformationテーブルからデータを取得
    .select("*"); // すべてのカラムを選択して取得

  if (error) {
    // エラーが発生した場合は、ステータス500とともにエラーメッセージを返す
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 正常にデータが取得できた場合は、ステータス200でデータを返す
  return NextResponse.json({ pets: petsData }, { status: 200 });
}

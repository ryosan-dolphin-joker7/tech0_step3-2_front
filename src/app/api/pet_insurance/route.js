import { createServerSupabaseClient } from "@/app/supabaseServer"; // サーバーサイドのSupabaseクライアントをインポート
import { NextResponse } from "next/server"; // Next.jsのレスポンスオブジェクトをインポート

export async function GET() {
  // GETリクエストを処理
  const supabase = createServerSupabaseClient();

  // Supabaseからデータを取得
  const { data: insuranceData, error } = await supabase.from("insurance")
    .select(`
      *,
      petinformation (
        family_id,
        petname
      )
    `);

  if (error) {
    // エラーが発生した場合は、ステータス500とともにエラーメッセージを返す
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 正常にデータが取得できた場合は、ステータス200でデータを返す
  return NextResponse.json({ insurancedata: insuranceData }, { status: 200 });
}

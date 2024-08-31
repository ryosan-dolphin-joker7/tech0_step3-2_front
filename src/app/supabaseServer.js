// supabaseServer.js

// Supabaseのサーバーサイドクライアントを作成するための関数をインポートします。
// これにより、サーバーサイドで安全にSupabaseにアクセスできます。
import { createServerClient } from "@supabase/ssr";

// Next.jsの「cookies」オブジェクトをインポートします。
// これを使って、サーバーサイドでクッキー（ユーザーのセッション情報）を管理します。
import { cookies } from "next/headers";

// サーバーサイドでSupabaseクライアントを作成する関数を定義します。
// この関数を使って、Supabaseとやり取りする際に必要なクライアントを生成します。
export function createServerSupabaseClient() {
  // クッキーストアを取得します。このオブジェクトを使って、クッキーを読み書きします。
  const cookieStore = cookies();

  // Supabaseのサーバーサイドクライアントを作成して返します。
  // クライアントは、環境変数から取得したURLとAPIキーを使って構成されます。
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, // SupabaseのURLを環境変数から取得
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // SupabaseのAPIキーを環境変数から取得
    {
      // クッキーの管理方法を定義します。これにより、サーバーサイドでセッションを管理できます。
      cookies: {
        // クライアントから送られてきたすべてのクッキーを取得します。
        getAll() {
          return cookieStore.getAll();
        },
        // クライアントに返すクッキーを設定します。
        setAll(cookiesToSet) {
          try {
            // 渡されたクッキーをすべて設定します。
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // このメソッドがサーバーコンポーネントから呼び出された場合、エラーが発生することがありますが、
            // ユーザーセッションをリフレッシュするミドルウェアがある場合は、このエラーを無視しても問題ありません。
          }
        },
      },
    }
  );
}

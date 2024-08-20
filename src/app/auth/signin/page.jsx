"use client"; // このコンポーネントがクライアント側で動作することを示します

import { getProviders, signIn } from "next-auth/react"; // next-authからサインインとプロバイダー取得の関数をインポート
import { useEffect, useState } from "react"; // Reactのフックをインポート

// 各プロバイダーに適用するボタンスタイルを定義します
const authStyle = {
  Discord: {
    className: "bg-blue-600 text-white border border-blue-500",
    color: "blue",
  },
  GitHub: {
    className: "bg-gray-700 text-white border border-gray-700",
    color: "gray",
  },
  Google: {
    className: "bg-white text-black border border-black",
    color: "gray",
  },
  Apple: {
    className: "bg-black text-white border border-black",
    color: "gray",
  },
};

export default function SignIn() {
  const [providers, setProviders] = useState(null); // 認証プロバイダーの状態を管理するためのステート
  const [email, setEmail] = useState(""); // メールアドレスの入力状態を管理するためのステート
  const [password, setPassword] = useState(""); // パスワードの入力状態を管理するためのステート
  const [loading, setLoading] = useState(true); // ローディング状態を管理するためのステート

  // コンポーネントが初めて表示されたときに認証プロバイダーの情報を取得する
  useEffect(() => {
    (async () => {
      try {
        const res = await getProviders(); // 認証プロバイダー情報を取得
        console.log("プロバイダー情報:", res); // プロバイダー情報をログに表示してデバッグ
        setProviders(res); // プロバイダー情報をステートにセット
      } catch (error) {
        console.error("プロバイダーの取得に失敗しました", error); // エラーハンドリング
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    })();
  }, []); // 空の依存配列を渡すことで、このエフェクトは一度だけ実行されます

  // ローディング中に表示するメッセージ
  if (loading) {
    return <div>Loading...</div>;
  }

  // プロバイダーが取得できなかった場合のエラーメッセージ
  if (!providers) {
    return (
      <div>プロバイダー情報の取得に失敗しました。もう一度お試しください。</div>
    );
  }

  // メールアドレスとパスワードでのログイン処理を行う関数
  const handleSignIn = async (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    try {
      await signIn("user", {
        email,
        password,
        callbackUrl: "/", // ログイン成功後にホーム画面にリダイレクト
      });
    } catch (error) {
      console.error("ログインに失敗しました", error); // エラーハンドリング
    }
  };

  return (
    <div>
      {/* 背景画像や色を設定 */}
      <div className="signin-bg fixed top-0 h-screen w-screen" />

      {/* 中央にログインフォームを配置 */}
      <div className="flex items-center justify-center h-screen">
        <div className="container z-10 flex flex-col items-center justify-center">
          <div className="rounded-xl border bg-white px-20 py-4">
            <div className="pb-10 pt-5 text-center">
              {/* サービスのタイトルとロゴを表示 */}
              <div className="signin-mini-logo-title">
                WAN PUSHで楽しくつながるPET×FAMILY
              </div>
              <div className="signin-logo-title text-xl font-bold">
                WAN PUSH
              </div>
              <div className="text-center text-sm text-gray-500">
                メールアドレスは「test1@wanpush.com」です。
                <br />
                パスワードは会場名（アルファベット6文字）です。
              </div>
            </div>

            {/* メールアドレスとパスワードでのログインフォーム */}
            <form
              onSubmit={handleSignIn} // フォーム送信時にhandleSignIn関数を実行
              className="flex flex-col items-center pb-10"
            >
              <input
                type="email" // メールアドレス入力フィールド
                value={email} // 入力されたメールアドレスをステートで管理
                onChange={(e) => setEmail(e.target.value)} // 入力値が変わったときにステートを更新
                placeholder="メールアドレス" // プレースホルダーとして「メールアドレス」と表示
                className="mb-3 w-72 rounded-lg border px-4 py-2"
                required // 必須フィールドに設定
              />
              <input
                type="password" // パスワード入力フィールド
                value={password} // 入力されたパスワードをステートで管理
                onChange={(e) => setPassword(e.target.value)} // 入力値が変わったときにステートを更新
                placeholder="パスワード" // プレースホルダーとして「パスワード」と表示
                className="mb-5 w-72 rounded-lg border px-4 py-2"
                required // 必須フィールドに設定
              />
              <button
                type="submit" // フォーム送信ボタン
                className="w-72 rounded-lg bg-blue-600 px-4 py-2 font-bold text-white"
              >
                メールアドレスでログイン
              </button>
            </form>

            {/* 他のプロバイダーを使ったログインボタンの表示 */}
            <div className="flex flex-col items-center pb-10">
              {Object.values(providers).map((provider) => {
                const style = authStyle[provider.name]; // 各プロバイダーに応じたスタイルを適用

                return (
                  <div key={provider.name}>
                    <button
                      className={`my-3 w-72 rounded-lg px-4 py-2 font-bold ${style?.className}`} // ボタンのスタイルを設定
                      onClick={
                        () => signIn(provider.id, { callbackUrl: "/" }) // ログイン成功後にホーム画面にリダイレクト
                      }
                    >
                      {provider.name} でログイン
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 利用規約とプライバシーポリシーに関する注意事項 */}
            <div className="pb-4 text-center text-sm text-gray-500">
              利用規約およびプライバシーポリシーに同意の上、
              <br />
              ログインへお進みください。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

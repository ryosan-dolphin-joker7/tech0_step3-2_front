import bcrypt from "bcryptjs"; // パスワードをハッシュ化して比較するためのbcryptライブラリをインポート
import CredentialsProvider from "next-auth/providers/credentials";

// ハッシュ化されたパスワードを持つユーザー情報を定義
const users = [
  {
    email: "test@test.com",
    // "test" というパスワードをハッシュ化して保存しています
    password: await bcrypt.hash("test", 10), // 非同期でハッシュ化
  },
];

// NextAuthの設定をエクスポートします
export const authOptions = {
  // 使用する認証プロバイダーを指定します
  providers: [
    CredentialsProvider({
      id: "user", // プロバイダーのIDを指定（任意）
      name: "User", // プロバイダー名を指定（任意）
      credentials: {
        email: {
          label: "メールアドレス", // フォームフィールドのラベル
          type: "email", // フォームフィールドのタイプ
          placeholder: "メールアドレス", // フォームフィールドのプレースホルダー
        },
        password: {
          label: "パスワード", // フォームフィールドのラベル
          type: "password", // フォームフィールドのタイプ
        },
      },
      // ユーザーがログインフォームに入力した情報を元に認証を行います
      async authorize(credentials) {
        // 入力されたメールアドレスでユーザーを検索
        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          // ユーザーが見つからない場合はエラーを投げる
          throw new Error("ユーザーが見つかりません");
        }

        // 入力されたパスワードをハッシュ化されたパスワードと比較
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        ); // 非同期で比較

        if (!isValidPassword) {
          // パスワードが間違っている場合はエラーを投げる
          throw new Error("パスワードが間違っています");
        }

        // 認証が成功した場合は、ユーザー情報を返す
        return { email: user.email };
      },
    }),
  ],

  // セキュリティのために必要なシークレットキーを設定
  secret: process.env.NEXTAUTH_SECRET,

  // JWT（JSON Web Token）の設定
  jwt: {
    maxAge: 3 * 24 * 60 * 60, // JWTの有効期限を3日間に設定
  },

  // セッション管理の設定
  session: {
    maxAge: 30 * 24 * 60 * 60, // セッションの有効期限を30日間に設定
    updateAge: 24 * 60 * 60, // 24時間ごとにセッションを自動更新
  },

  // カスタムエラーページの設定（任意）
  // サインインページのカスタム設定は削除し、デフォルトを使用します
  pages: {
    error: "/auth/error", // エラーページのパスを指定（必要に応じて）
    // signInオプションは削除しています
  },
};

// NextAuthの設定をエクスポート
export default authOptions;

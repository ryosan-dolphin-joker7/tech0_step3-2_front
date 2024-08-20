import bcrypt from "bcryptjs"; // bcryptjsライブラリをインポートして、パスワードのハッシュ化と比較を行います
import CredentialsProvider from "next-auth/providers/credentials"; // NextAuthのCredentialsプロバイダーをインポート

// 仮のユーザー情報を定義（通常はデータベースから取得します）
const users = [
  {
    email: "test1@wanpush.com",
    password: "kokuyo", // プレーンテキストのパスワード（後でハッシュ化します）
    family_id: 1,
  },
  {
    email: "test2@wanpush.com",
    password: "kokuyo", // プレーンテキストのパスワード（後でハッシュ化します）
    family_id: 2,
  },
  {
    email: "test3@wanpush.com",
    password: "kokuyo", // プレーンテキストのパスワード（後でハッシュ化します）
    family_id: 3,
  },
  {
    email: "test4@wanpush.com",
    password: "kokuyo", // プレーンテキストのパスワード（後でハッシュ化します）
    family_id: 4,
  },
];

// NextAuthの設定オプションをエクスポート
export const authOptions = {
  // 使用する認証プロバイダーを設定
  providers: [
    CredentialsProvider({
      id: "user", // プロバイダーのIDを指定
      name: "User", // プロバイダー名を指定
      credentials: {
        email: {
          label: "メールアドレス",
          type: "email",
          placeholder: "メールアドレス",
        }, // メールアドレスの入力フィールドを定義
        password: { label: "パスワード", type: "password" }, // パスワードの入力フィールドを定義
      },
      async authorize(credentials) {
        // 入力されたメールアドレスに一致するユーザーを検索
        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          // ユーザーが見つからない場合、エラーを投げます
          throw new Error("ユーザーが見つかりません");
        }
        // プレーンテキストのパスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(user.password, 10); // 非同期でハッシュ化

        // 入力されたパスワードをハッシュ化されたパスワードと比較します
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          hashedPassword
        ); // 非同期で比較

        if (!isValidPassword) {
          // パスワードが一致しない場合、エラーを投げます
          throw new Error("パスワードが間違っています");
        }

        // 認証が成功した場合、ユーザー情報を返します
        return { email: user.email, family_id: user.family_id };
      },
    }),
  ],

  // セキュリティのためのシークレットキーを環境変数から取得
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

  // カスタムログインページとエラーページのパスを指定
  pages: {
    signIn: "/auth/signin", // カスタムログインページ
    error: "/auth/error", // カスタムエラーページ
  },

  // JWTやセッションにカスタムデータを含めるためのコールバック関数
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.family_id = user.family_id; // 初回ログイン時にfamily_idをJWTに追加
      }
      return token; // トークンを返す
    },
    async session({ session, token }) {
      if (token.family_id) {
        session.family_id = token.family_id; // セッションにfamily_idを追加
      }
      return session; // セッションを返す
    },
  },
};

// authOptionsをデフォルトエクスポート
export default authOptions;

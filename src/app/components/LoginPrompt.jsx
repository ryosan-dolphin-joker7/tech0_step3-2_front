import { signIn } from "next-auth/react";

export default function LoginPrompt() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ログイン
        </button>
      </div>
    </div>
  );
}

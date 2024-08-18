import { signOut } from "next-auth/react";

export default function LogoutPrompt() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">ログアウトします</h1>
        <button
          onClick={() => signOut()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}

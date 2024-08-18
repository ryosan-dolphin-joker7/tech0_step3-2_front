// LoginPrompt.tsx
import { signIn } from "next-auth/react";

export default function LoginPrompt() {
  return (
    <div>
      <h1>ログインが必要です</h1>
      <button onClick={() => signIn()}>ログイン</button>
    </div>
  );
}

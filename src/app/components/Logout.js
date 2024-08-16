"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

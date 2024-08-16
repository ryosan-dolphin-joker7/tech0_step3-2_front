"use client";
import { useSession } from "next-auth/react";

export default function Session() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div>ログインしてる</div>
      ) : (
        <div>ログインしてない</div>
      )}
    </>
  );
}

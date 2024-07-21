// src/app/todos/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

import { Suspense } from "react";
import PostsView from "../components/posts.jsx";

export default function HomePage() {
  return (
    <>
      ToDo_List
      <Suspense fallback={<p>データ読み込み中...</p>}>
        <PostsView />
      </Suspense>
    </>
  );
}

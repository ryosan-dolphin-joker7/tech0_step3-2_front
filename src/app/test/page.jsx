// src/app/todos/page.jsx
"use client"; // クライアント側で動作するコードであることを指定しています。

import { Suspense } from "react";
import PostsView from "../components/posts.jsx";
import PostsPhoto from "../components/posts_photo.jsx";
import BackButton from "../components/back_button.jsx";

export default function HomePage() {
  return (
    <>
      Test_Supabase
      <Suspense fallback={<p>データ読み込み中...</p>}>
        <PostsView />
        <PostsPhoto />
      </Suspense>
      <div>
        <BackButton>戻る</BackButton>
      </div>
    </>
  );
}

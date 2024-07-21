// src/app/page.jsx
"use client";

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

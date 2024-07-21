// src/app/components/posts.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js"; // クライアントサイドのSupabaseクライアントを使用

const PostsView = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      const { data: posts, error } = await supabase.from("todos").select("*");
      if (error) console.error(error);
      setPosts(posts || []);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((thePost) => (
        <div key={thePost.uuid}>
          <p className="title">{thePost.title}</p>
          <p className="text">{thePost.contents}</p>
        </div>
      ))}
    </>
  );
};

export default PostsView;

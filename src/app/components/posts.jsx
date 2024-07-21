// src/app/components/posts.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // supabaseClientを外部ファイルからインポート

const PostsView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const [error, setError] = useState(null); // エラー状態を追加

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) {
          throw error;
        }
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  if (error) {
    return <div>Error: {error}</div>; // エラー時の表示
  }

  return (
    <>
      {posts.map((thePost) => (
        <div key={thePost.uuid || thePost.id}>
          {" "}
          {/* ユニークなキーを追加 */}
          <p className="title">{thePost.title}</p>
          <p className="text">{thePost.contents}</p>
        </div>
      ))}
    </>
  );
};

export default PostsView;

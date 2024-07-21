// src/app/components/posts_photo.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js"; // クライアントサイドのSupabaseクライアントを使用

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PostsPhoto = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*");

        if (postsError) {
          console.error(postsError);
          return;
        }

        // 各投稿に対して写真のURLを取得
        const postsWithImages = await Promise.all(
          postsData.map(async (post) => {
            const {
              data: { publicURL },
              error: storageError,
            } = await supabase.storage
              .from("one_pushu_photos") // ストレージバケット名を指定
              .getPublicUrl(post.photo_path); // photo_pathカラムにストレージ内のファイルパスが格納されていると仮定
            if (storageError) {
              console.error(storageError);
              return { ...post, imageUrl: null };
            }
            return { ...post, imageUrl: publicURL };
          })
        );

        setPosts(postsWithImages);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((thePost) => (
        <div key={thePost.uuid}>
          {thePost.imageUrl && (
            <img src={thePost.imageUrl} alt={thePost.title} />
          )}
        </div>
      ))}
    </>
  );
};

export default PostsPhoto;

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// PostsPhotoコンポーネントの定義
const PostsPhoto = () => {
  // ステートの初期化
  const [state, setState] = useState({
    urlList: [],
    loadingState: "hidden",
    imageUrl: "",
    error: null,
  });

  // 新たに追加されたステート変数
  const [images, setImages] = useState([]);

  // 全ての画像をリストする関数を定義
  const listAllImage = async () => {
    try {
      // 読み込み中のスタイルを設定
      setState((prevState) => ({
        ...prevState,
        loadingState: "flex justify-center",
      }));

      // Supabaseのストレージから画像リストを取得
      const { data, error } = await supabase.storage
        .from("one_push_photo")
        .list("img", {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      console.log({ data, error });

      if (error) {
        throw error;
      }

      // 画像の公開URLを取得
      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const { publicURL, error } = supabase.storage
            .from("one_push_photo")
            .getPublicUrl(`img/${file.name}`);

          if (error) {
            console.error("Error generating public URL:", error);
            return null;
          }

          console.log(`Generated public URL: ${publicURL}`);
          return publicURL;
        })
      );

      // imagesステートを更新
      setImages(imageUrls.filter((url) => url !== null));

      const { data2, error2 } = await supabase.storage.getBucket(
        "one_push_photo"
      );
      console.log({ data2, error2 });

      // 取得したデータから、特定のプレースホルダー以外のファイル名をリストに追加
      const tempUrlList = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => file.name);

      // 画像リストが空の場合のログ
      if (tempUrlList.length === 0) {
        console.warn("No files found in the 'img' directory.");
      }

      // ステートの更新
      setState((prevState) => ({
        ...prevState,
        urlList: tempUrlList,
        loadingState: "hidden",
      }));
    } catch (error) {
      console.error("Error fetching image list:", error);
      setState((prevState) => ({
        ...prevState,
        loadingState: "hidden",
        error: error.message,
      }));
    }
  };

  // 画像の公開URLを取得する関数
  const fetchImageUrl = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("one_push_photo")
        .getPublicUrl("img/dolphin.png");

      console.log({ data, error });

      if (error) {
        throw error;
      }

      setState((prevState) => ({ ...prevState, imageUrl: data.publicURL }));
    } catch (error) {
      console.error("Error fetching public URL:", error);
      setState((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  // コンポーネントがマウントされたときに画像リストと公開URLを取得する
  useEffect(() => {
    listAllImage();
    fetchImageUrl();
  }, []);

  const { urlList, loadingState, imageUrl, error } = state;

  return (
    <div className="w-full max-w-3xl">
      {error && <p className="text-red-500">{error}</p>}
      <div className={loadingState} aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      <div className="w-full my-4">
        <h2>直接指定した画像の表示</h2>
        <img
          className="object-cover max-h-32 w-full"
          src="https://stbzpjxztwhzlqgsievd.supabase.co/storage/v1/object/public/one_push_photo/img/dolphin.png"
          alt="Directly specified dolphin"
        />
      </div>
      <div>
        <ul className="flex flex-wrap w-full">
          {urlList.length === 0 && <li>画像が見つかりませんでした</li>}
          {urlList.map((item, index) => (
            <li className="w-auto h-auto p-1" key={index}>
              <a
                className="hover:opacity-50"
                href={`${imageUrl}${item}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="object-cover max-h-32 w-full"
                  src={`${imageUrl}${item}`}
                  alt={item}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>画像ギャラリー</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {images.map((url, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPhoto;

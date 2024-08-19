import { useEffect, useState } from "react";
import { supabase } from "@/app/supabaseClient";

// PostsPhotoコンポーネントの定義
const PostsPhoto = () => {
  // ステートの初期化
  const [state, setState] = useState({
    urlList: [], // 画像ファイル名のリスト
    loadingState: "hidden", // 読み込み中の表示制御
    imageUrl: "", // 画像の公開URL
    error: null, // エラーメッセージ
  });

  // 画像URLのリストを管理するステート
  const [images, setImages] = useState([]);

  // 全ての画像をリストする関数
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
          limit: 100, // 取得するファイルの最大数
          offset: 0, // 取得の開始位置
          sortBy: { column: "created_at", order: "desc" }, // 作成日時で降順にソート
        });

      // エラーチェック
      if (error) {
        throw error; // エラーがあれば例外を投げる
      }
      console.log("storage list data:", data);

      // 画像の公開URLを取得
      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const { data, error } = supabase.storage
            .from("one_push_photo")
            .getPublicUrl(`img/${file.name}`);
          console.log(`file.name: ${file.name}`);

          if (error) {
            console.error("Error generating public URL:", error);
            return null; // エラーがあればnullを返す
          }

          console.log(
            `Generated public URL for ${file.name}: ${data.publicUrl}`
          );
          return publicUrl; // 正常に取得できた場合は公開URLを返す
        })
      );

      // 公開URLが有効な画像のみをフィルタリングしてセット
      setImages(imageUrls.filter((url) => url !== null));

      // 特定のプレースホルダー以外のファイル名をリストに追加
      const tempUrlList = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => file.name);

      // ステートの更新
      setState((prevState) => ({
        ...prevState,
        urlList: tempUrlList, // 画像ファイル名のリストを更新
        loadingState: "hidden", // 読み込み状態を非表示に
      }));
    } catch (error) {
      // エラーハンドリング
      console.error("Error fetching image list:", error);
      setState((prevState) => ({
        ...prevState,
        loadingState: "hidden", // 読み込み状態を非表示に
        error: error.message, // エラーメッセージをステートにセット
      }));
    }
  };

  // ファイル名を指定して画像の公開URLを取得する関数
  const fetchImageUrl = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("one_push_photo")
        .getPublicUrl("img/dolphin.png");

      if (error) {
        throw error;
      }
      console.log(`fetchImage URL:`, data.publicUrl);
      // ステートの更新
      setState((prevState) => ({ ...prevState, imageUrl: data.publicUrl }));
    } catch (error) {
      // エラーハンドリング
      console.error("Error fetching direct public URL:", error);
      setState((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  // コンポーネントがマウントされたときに画像リストと公開URLを取得する
  useEffect(() => {
    fetchImageUrl();
    listAllImage();
  }, []);

  // ステートから必要なデータを取得
  const { urlList, loadingState, imageUrl, error } = state;

  return (
    <div className="w-full max-w-3xl">
      {/* エラーメッセージの表示 */}
      {error && <p className="text-red-500">{error}</p>}
      {/* 読み込み中のスピナー表示 */}
      <div className={loadingState} aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      {/* 直接指定した画像の表示 */}
      <div className="w-full my-4">
        <h2>直接URLを指定して画像を表示</h2>
        <img
          className="object-cover max-h-32 w-full"
          src="https://stbzpjxztwhzlqgsievd.supabase.co/storage/v1/object/public/one_push_photo/img/dolphin.png"
          alt="Directly specified dolphin"
        />
      </div>
      {/* 読み込んだURLで指定して画像を表示 */}
      <div className="w-full my-4">
        <h2>読み込んだURLで指定して画像を表示</h2>
        <img
          className="object-cover max-h-32 w-full"
          src={imageUrl}
          alt="Directly specified dolphin"
        />
      </div>
      {/* 画像リストの表示 */}
      <div>
        <h2>画像リストでの表示</h2>
        <ul className="flex flex-wrap w-full">
          {urlList.length === 0 && <li>画像が見つかりませんでした</li>}
          {urlList.map((item, index) => (
            <li className="w-auto h-auto p-1" key={index}>
              <a
                className="hover:opacity-50"
                href={item} // ここを修正
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="object-cover max-h-32 w-full"
                  src={item} // ここを修正
                  alt={item}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 画像ギャラリーの表示 */}
      <div>
        <h1>画像ギャラリーでの表示</h1>
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

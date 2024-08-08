export async function fetchImages(breed) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/12`
  );
  const data = await response.json();
  return data.message;
}

// 犬種リストを取得する関数
async function fetchBreeds() {
  try {
    // APIにリクエストを送信
    const response = await fetch("https://dog.ceo/api/breeds/list/all");

    // レスポンスをJSONフォーマットでパース
    const data = await response.json();

    // 犬種リストを抽出
    const breeds = Object.keys(data.message);

    // 犬種リストをコンソールに出力
    console.log(breeds);

    // 必要に応じて、犬種リストを返す
    return breeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"; // Material-UIのコンポーネントをインポートしています。

// APIから画像を取得する関数を定義します。
async function fetchImages(breed) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/3`
  );
  const data = await response.json();
  return data.message;
}

// Formコンポーネント
function Form({ onFormSubmit }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        const breedsList = Object.keys(data.message);
        setBreeds(breedsList);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    }

    fetchBreeds();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    onFormSubmit(breed.value);
  }

  return (
    <div style={{ paddingTop: "60px", textAlign: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p>犬種を選んでRELOADボタンを押してください</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <Button type="submit" variant="contained" color="primary">
              Reload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Galleryコンポーネント
function Gallery({ urls }) {
  if (!urls) {
    return <p>Click Reload to load images.</p>;
  }
  return (
    <div className="gallery">
      {urls.map((url, index) => (
        <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia component="img" height="140" image={url} alt="dog" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {url}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Mainコンポーネント
export default function GetDogImagePage() {
  const [urls, setUrls] = useState(null); // 初期値をnullにして最初は画像を表示しない

  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls); // RELOADボタンが押されたときに画像を取得
    });
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <Link href="/management" passHref>
        <Button variant="contained" color="primary" sx={{ marginTop: "16px" }}>
          戻る
        </Button>
      </Link>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

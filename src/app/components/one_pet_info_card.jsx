import Image from "next/image";
import React from "react";

export default function OnePetInfoCard({ petInfo }) {
  if (!petInfo) {
    return <p>アカウントを選んでください。</p>;
  }

  const {
    petname, // ペットの名前
    breed, // ペットの犬種
    birthdate, // ペットの生年月日
    gender, // ペットの性別
    weight, // ペットの体重
    furcolor, // ペットの毛色
    notes, // ペットの特徴やメモ
    photo_url, // ペットの写真のURL
  } = petInfo;

  return (
    <div className="container">
      <h2 className="dog-name">Today's : {petname}</h2>

      <div
        className="image-container"
        style={{
          display: "flex",
          justifyContent: "center",
          maxHeight: "200px", // 画像の最大の高さを200pxに制限します
        }}
      >
        <Image
          src={photo_url} // 画像のURLを指定します
          alt={petname} // 画像の代替テキストとしてペットの名前を指定します
          width={500} // 画像の幅を500pxに設定
          height={500} // 画像の高さを500pxに設定
          style={{
            borderRadius: "10px", // 画像の角を10px丸くします
            width: "auto", // 親要素の幅に合わせますが、縦横比を維持します
            height: "100%", // 親要素の高さに合わせますが、縦横比を維持します
            objectFit: "contain", // 画像全体を表示し、縦横比を維持します
          }}
        />
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>

          <table className="profile-table">
            <tbody>
              <tr>
                <th>生年月日</th>
                <td>{birthdate}</td>
              </tr>
              <tr>
                <th>性別</th>
                <td>{gender}</td>
              </tr>
              <tr>
                <th>犬種</th>
                <td>{breed}</td>
              </tr>
              <tr>
                <th>毛色</th>
                <td>{furcolor}</td>
              </tr>
              <tr>
                <th>体重</th>
                <td>{weight} kg</td>
              </tr>
              <tr>
                <th>個性</th>
                <td>{notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .container {
          text-align: center; // コンテンツ全体を中央揃えにします
        }
        .dog-name {
          color: red; // ペットの名前を赤色で表示します
          font-size: 22px; // フォントサイズを24pxに設定します
          text-align: center; // テキストを中央揃えにします
          font-weight: bold; // フォントを太字にします
        }
        .image-container {
          display: flex;
          justify-content: center; // 画像を中央に配置します
          max-height: 200px; // コンテナの最大の高さを200pxに制限します
        }
        .card {
          margin: 16px auto; // カードを上下左右に16pxのマージンを設定し、中央に配置します
          padding: 1px; // カードの内側に1pxのパディングを設定します
          border: 1px solid #ddd; // カードに薄いグレーのボーダーを設定します
          border-radius: 10px; // カードの角を10px丸くします
          max-width: 500px; // カードの最大の幅を500pxに制限します
          background-color: white; // カードの背景色を白に設定します
        }
        .card-title {
          color: red; // タイトルを赤色で表示します
          font-size: 24px; // フォントサイズを24pxに設定します
        }
        .profile-table {
          width: 100%; // テーブルの幅を親要素に合わせます
        }
        .profile-table th,
        .profile-table td {
          text-align: left; // テキストを左揃えにします
        }
        .profile-table th {
          width: 30%; // テーブルヘッダーの幅を30%に設定します
          font-weight: bold; // テーブルヘッダーのフォントを太字にします
        }
      `}</style>
    </div>
  );
}

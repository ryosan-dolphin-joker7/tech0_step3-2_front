import React from "react";

export default function OnePetInfoCard({ petInfo }) {
  // ペット情報がない場合、アカウント選択を促すメッセージを表示
  if (!petInfo) {
    return <p>アカウントを選んでください。</p>;
  }

  // ペット情報を変数に格納
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
      {/* ペットの名前を表示 */}
      <h2 className="dog-name">Today&apos;s: {petname}</h2>

      {/* 画像を表示するためのコンテナ */}
      <div className="image-container">
        {/* 通常のimgタグを使用して画像を表示 */}
        <img
          src={photo_url} // 画像のURLを指定
          alt={petname} // 画像が表示されないときに代わりに表示するテキスト
          className="pet-image" // CSSクラスを指定
        />
      </div>

      {/* ペットのプロフィール情報を表示するカード */}
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

      {/* スタイルを定義 */}
      <style jsx>{`
        .container {
          text-align: center; /* コンテンツ全体を中央揃えに */
        }
        .dog-name {
          color: red; /* ペットの名前を赤色で表示 */
          font-size: 22px; /* フォントサイズを22pxに設定 */
          text-align: center; /* テキストを中央揃えに */
          font-weight: bold; /* フォントを太字に */
        }
        .image-container {
          display: flex;
          justify-content: center; /* 画像を中央に配置 */
          max-width: 500px; /* 画像コンテナの最大幅を500pxに設定 */
          max-height: 500px; /* 画像コンテナの最大高さを500pxに設定 */
          width: 100%; /* コンテナの幅を親要素に合わせて100%に設定 */
          height: auto; /* 高さは自動で調整 */
          overflow: hidden; /* 画像がコンテナからはみ出さないようにする */
        }
        .pet-image {
          width: 70%; /* 親要素に合わせて画像の幅を100%に設定 */
          height: 70%; /* 親要素の高さに合わせて画像の高さを100%に設定 */
          object-fit: cover; /* 画像がコンテナを覆うように表示（縦横比を維持） */
          border-radius: 10px; /* 画像の角を10px丸くする */
        }
        .card {
          margin: 16px auto; /* カードを上下左右に16pxのマージンで中央に配置 */
          padding: 1px; /* カードの内側に1pxのパディングを設定 */
          border: 1px solid #ddd; /* 薄いグレーのボーダーをカードに設定 */
          border-radius: 10px; /* カードの角を10px丸くする */
          max-width: 500px; /* カードの最大幅を500pxに設定 */
          background-color: white; /* カードの背景色を白に設定 */
        }
        .card-body {
          padding: 10px; /* カードの内側に10pxのパディングを設定 */
        }
        .card-title {
          color: red; /* タイトルを赤色で表示 */
          font-size: 24px; /* フォントサイズを24pxに設定 */
        }
        .profile-table {
          width: 100%; /* テーブルの幅を親要素に合わせる */
        }
        .profile-table th,
        .profile-table td {
          text-align: left; /* テキストを左揃えに */
        }
        .profile-table th {
          width: 30%; /* テーブルヘッダーの幅を40%に設定 */
          font-weight: bold; /* テーブルヘッダーのフォントを太字に */
        }
      `}</style>
    </div>
  );
}

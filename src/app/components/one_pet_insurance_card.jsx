import React from "react";

export default function OnePetInsuranceCard({ petInsurance }) {
  // ペット情報がない場合、アカウント選択を促すメッセージを表示
  if (!petInsurance) {
    return <p>アカウントを選んでください。</p>;
  }

  // ペット情報を変数に格納
  const {
    insurance_name, // 保険の名前
    insurance_number, // 保険番号
    petid, // ペットのID
    petinformation: { petname }, // ペット情報からペットの名前を取得
    insurance_card_url, // 保険証の写真のURL
  } = petInsurance;

  return (
    <div className="container">
      {/* ペットの名前を表示 */}
      <h2 className="dog-name">{petname}の証票類</h2>
      {/* ペットのプロフィール情報を表示するカード */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">保険証</h2>
          <table className="profile-table">
            <tbody>
              <tr>
                <th>保険の名前</th>
                <td>{insurance_name}</td>
              </tr>
              <tr>
                <th>保険番号</th>
                <td>{insurance_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 画像を表示するためのコンテナ */}
        <div className="image-container">
          {/* 通常のimgタグを使用して画像を表示 */}
          <img
            src={insurance_card_url} // 画像のURLを指定
            alt={insurance_name} // 画像が表示されないときに代わりに表示するテキスト
            className="insurance-image" // CSSクラスを指定
          />
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
        .insurance-image {
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
          font-size: 18px; /* フォントサイズを24pxに設定 */
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

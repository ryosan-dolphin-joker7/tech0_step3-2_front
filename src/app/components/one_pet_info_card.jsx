import React from "react";

export default function OnePetInfoCard({ petInfo }) {
  const { pet_id, pet_name, breed, birth_date, gender, weight, photo_url } =
    petInfo;

  return (
    <div className="m-4 card bordered bg-red-100 duration-200 hover:border-r-red">
      {/* カードのボディ部分 */}
      <div className="card-body">
        {/* ペットの名前を表示するヘッダー */}
        <h2 className="card-title">{pet_name}</h2>
        {/* ペットの生年月日を表示 */}
        <p>生年月日: {birth_date}</p>
        {/* ペットの品種を表示 */}
        <p>犬種: {breed}</p>
        {/* ペットの性別を表示 */}
        <p>性別: {gender}</p>
        {/* ペットの体重を表示 */}
        <p>体重 {weight}</p>
        {/* ペットの写真を表示 */}
        <img src={photo_url} alt={pet_name} />
      </div>
    </div>
  );
}

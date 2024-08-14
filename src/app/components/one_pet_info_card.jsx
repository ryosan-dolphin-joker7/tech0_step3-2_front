import Image from "next/image";
import React from "react";

export default function OnePetInfoCard({ petInfo }) {
  if (!petInfo) {
    return <p>アカウントを選んでください。</p>;
  }

  const {
    petname,
    breed,
    birthdate,
    gender,
    weight,
    furcolor,
    notes,
    photo_url,
  } = petInfo;

  return (
    <div className="container">
      <h2 className="dog-name">Today's : {petname}</h2>
      <div className="image-container">
        <Image
          src={photo_url}
          alt={petname}
          width={500}
          height={500}
          style={{
            borderRadius: "20px", // 画像の角を丸くする
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
          text-align: center;
        }
        .dog-name {
          color: red;
          font-size: 24px;
          text-align: center;
          font-weight: bold;
        }
        .image-container {
          display: flex;
          justify-content: center;
        }
        .card {
          margin: 16px auto;
          padding: 1px;
          border: 1px solid #ddd;
          border-radius: 10px;
          max-width: 500px;
          background-color: white;
        }
        .card-title {
          color: red;
          font-size: 24px;
        }
        .profile-table {
          width: 100%;
        }
        .profile-table th,
        .profile-table td {
          text-align: left;
        }
        .profile-table th {
          width: 30%;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

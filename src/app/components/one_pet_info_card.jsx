import React, { useState, useEffect } from "react"; // Reactの基本的なフックをインポート
import { supabase } from "@/supabaseClient"; // Supabaseクライアントをインポート

export default function OnePetInfoCard({ petInfo }) {
  const [todayTasks, setTodayTasks] = useState([]); // 今日のタスクを管理するステートを定義

  // ペット情報がない場合、アカウント選択を促すメッセージを表示
  if (!petInfo) {
    return <p>アカウントを選んでください。</p>;
  }

  // 今日のタスクをSupabaseから取得する関数
  useEffect(() => {
    const fetchTodayTasks = async () => {
      const today = new Date().toISOString().split("T")[0]; // 今日の日付をYYYY-MM-DD形式で取得

      // todosテーブルから、今日のタスクを取得
      const { data: tasksData, error: tasksError } = await supabase
        .from("todos")
        .select("*")
        .eq("end_date", today); // `end_date`が今日の日付と一致するタスクを取得

      if (tasksError) {
        console.error(
          "今日のタスクの取得に失敗しました: " + tasksError.message
        );
      } else {
        setTodayTasks(tasksData || []); // 取得したデータをステートに保存
      }
    };

    fetchTodayTasks(); // コンポーネントのマウント時にタスクを取得
  }, []);

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

      {/* 今日のタスクを表示する */}
      <div style={{ marginTop: "20px" }}>
        <h2>
          今日は
          {todayTasks.length > 0 ? (
            todayTasks.map((task, index) => (
              <span key={task.id}>
                {task.title}
                {index < todayTasks.length - 1 ? "、" : "をやるワン！"}
                {/* 複数タスクの場合は「、」、最後のタスクには「をやるワン！」を付ける */}
              </span>
            ))
          ) : (
            <span>暇だなぁ</span> // 今日のタスクが無い場合のメッセージ
          )}
        </h2>
      </div>

      {/* 画像を表示するためのコンテナ */}
      <div className="image-container">
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

      <style jsx>{`
        .container {
          text-align: center;
        }
        .dog-name {
          color: red;
          font-size: 22px;
          text-align: center;
          font-weight: bold;
        }
        .image-container {
          display: flex;
          justify-content: center;
          max-width: 500px;
          max-height: 500px;
          width: 100%;
          height: auto;
          overflow: hidden;
        }
        .pet-image {
          width: 70%;
          height: 70%;
          object-fit: cover;
          border-radius: 10px;
        }
        .card {
          margin: 16px auto;
          padding: 1px;
          border: 1px solid #ddd;
          border-radius: 10px;
          max-width: 500px;
          background-color: white;
        }
        .card-body {
          padding: 10px;
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

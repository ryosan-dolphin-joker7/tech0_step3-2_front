import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/app/supabaseClient";
import Image from "next/image";

export default function OnePetInfoCard({ petInfo }) {
  const [todayTasks, setTodayTasks] = useState([]); // 今日のタスクを管理するステートを定義

  // 今日のタスクをSupabaseから取得する関数
  const fetchTodayTasks = useCallback(async () => {
    const today = new Date().toISOString().split("T")[0]; // 今日の日付をYYYY-MM-DD形式で取得

    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from("todos")
        .select("*")
        .eq("end_date", today); // `end_date`が今日の日付と一致するタスクを取得

      if (tasksError) {
        throw new Error(tasksError.message);
      }

      setTodayTasks(tasksData || []); // 取得したデータをステートに保存
    } catch (error) {
      console.error("今日のタスクの取得に失敗しました:", error.message);
    }
  }, []);

  useEffect(() => {
    if (petInfo) {
      fetchTodayTasks(); // コンポーネントのマウント時にタスクを取得
    }
  }, [fetchTodayTasks, petInfo]);

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
      {/* ペットの名前を表示 */}
      <h2 className="dog-name">{petname}のプロフィール</h2>

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

      {/* スタイル定義 */}
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
          position: relative; // 子要素を相対的に配置
          display: flex;
          justify-content: center;
          max-width: 500px;
          max-height: 500px;
          width: 100%;
          height: auto;
          overflow: hidden;
        }
        .pet-image {
          border-radius: 10px;
        }
        .task-overlay {
          position: absolute; // 親要素に対して絶対位置を指定
          top: 10%; // 画像の上部に位置
          left: 50%; // 水平方向の中央に配置
          transform: translateX(-50%); // 中央揃え
          background-color: rgba(255, 255, 255, 0.9); // 半透明の背景
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          font-weight: bold;
          width: 80%; // オーバーレイの幅を指定
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

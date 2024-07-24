// src/app/tasks/page.jsx
"use client";
import OneCustomerInfoCard from "../components/one_task_info_card.jsx";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

export default function Page() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const formRef = useRef();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setItems(data || []); // データがnullの場合に空配列を設定
    } catch (error) {
      setError("データの取得に失敗しました: " + error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting:", { taskName, taskDate }); // デバッグ用ログ
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ task_name: taskName, date: taskDate }]);
      if (error) throw error;
      if (data && data.length > 0) {
        setItems([...items, data[0]]);
      }
      setTaskName("");
      setTaskDate("");
      router.push("/tasks");
    } catch (error) {
      setError("タスクの登録に失敗しました: " + error.message);
    }
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDateChange = (event) => {
    setTaskDate(event.target.value);
  };

  return (
    <>
      <h1>Supabaseのデータベースにタスクを登録する画面</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <p>
                Task name:
                <input
                  type="text"
                  name="task_name"
                  placeholder="何をする？"
                  className="input input-bordered"
                  value={taskName}
                  onChange={handleTaskNameChange}
                />
              </p>
              <p>
                Date:
                <input
                  type="date"
                  name="date"
                  placeholder="2024/07/24"
                  className="input input-bordered"
                  value={taskDate}
                  onChange={handleDateChange}
                />
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary m-4 text-2xl"
                disabled={!taskName || !taskDate}
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((taskInfo) => (
          <div
            key={taskInfo.task_id}
            className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4"
          >
            <OneCustomerInfoCard {...taskInfo} />
            <div className="card-body flex flex-col justify-between">
              <Link href={`/tasks/read/${taskInfo.task_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Read
                </button>
              </Link>
              <Link href={`/tasks/update/${taskInfo.task_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Update
                </button>
              </Link>
              <Link href={`/tasks/delete/${taskInfo.task_id}`}>
                <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link href="/">
          <button className="btn btn-primary m-4 text-2xl">戻る</button>
        </Link>
      </div>
    </>
  );
}

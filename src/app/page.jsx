"use client"; // クライアント側で動作するコードであることを指定しています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。
import { useEffect, useState, useRef } from "react"; // Reactのフック（useEffectとuseState）をインポートしています。
import { supabase } from "@/supabaseClient";
import OneCustomerInfoCard from "@/components/one_task_info_card.jsx";
import { Button, IconButton, ButtonGroup } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

// 顧客情報を表示するページコンポーネントを定義しています。
export default function Page() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setItems(data || []); // データがnullの場合に空配列を設定
    } catch (error) {
      setError("データの取得に失敗しました: " + error.message);
    }
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 顧客情報を表示するコンポーネントをレンダリングしています。
  return (
    <>
      <div>
        <h1>ここにヘッダーを入れる</h1>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button>メニューアイコン</Button>
          <Button>アラーム</Button>
          <Button>設定</Button>
          <Button>アカウント</Button>
          <Button
            variant="outlined"
            aria-label="toggle theme"
            onClick={toggleTheme}
            startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          >
            {theme === "light" ? "" : ""}
          </Button>
        </ButtonGroup>
      </div>

      <h1>ここに投稿カードを表示する</h1>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        {items.map((taskInfo) => (
          <div
            key={taskInfo.task_id}
            className={`card bordered border-blue-200 border-2 flex flex-row max-w-sm m-4 ${
              theme === "light" ? "bg-white" : "bg-gray-200"
            }`}
          >
            <OneCustomerInfoCard {...taskInfo} />
          </div>
        ))}
      </div>
      <div>
        <Link href="/">
          <button className="btn btn-primary m-2 text-2xl">WanPush</button>
        </Link>
      </div>

      <div>
        <h1>ここにフッターを入れる</h1>
        <button className="btn btn-primary m-1 text-1xl hover:text-white">
          Home
        </button>
        <button className="btn btn-primary m-1 text-1x1 hover:text-white">
          検索
        </button>
        <button className="btn btn-primary m-1 text-1x1 hover:text-white">
          日程
        </button>
        <button className="btn btn-primary m-1 text-1x1 hover:text-white">
          タスク
        </button>
      </div>

      <h1>ここから下はテスト用に作っているコンポーネントの表示画面へ</h1>
      <div className="p-4">
        <Link href="/supabase_component" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Supabase_Component
          </button>
        </Link>
      </div>
      <div className="p-4">
        <Link href="/test_component" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Test_Component
          </button>
        </Link>
      </div>
    </>
  );
}

import { Button, ButtonGroup } from "@mui/material"; // Material-UIのボタンコンポーネントをインポートしています。
import Link from "next/link"; // ページ間リンクを作成するためのコンポーネントをインポートしています。

export default function Footer({ theme }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <div>
        <Link href="/">
          <button className="btn btn-primary m-2 text-2xl">WanPush</button>
        </Link>
      </div>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Link href="/" prefetch={false}>
          <Button>Home</Button>
        </Link>
        <Button>検索</Button>
        <Button>日程</Button>
        <Link href="/tasks" prefetch={false}>
          <Button>タスク</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}

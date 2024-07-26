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

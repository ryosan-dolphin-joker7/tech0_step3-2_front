import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"; // Material-UIコンポーネントのインポート
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Material-UIアイコンのインポート

export default function OnePostInfoCard({ taskInfo, talks }) {
  const { task_id, task_name, task_content, date, photo_url } = taskInfo;

  return (
    <>
      <div className="m-4 card bordered bg-blue-100 duration-200 hover:border-r-red">
        {/* カードのボディ部分 */}
        <div className="card-body">
          {/* タスクの名前を表示するヘッダー */}
          <h2 className="card-title">{task_name}</h2>
          {/* タスクのIDを表示 */}
          <p>Task ID: {task_id}</p>
          {/* タスクの内容を表示 */}
          <p>Task Content: {task_content}</p>
          {/* タスクの日付を表示 */}
          <p>Date: {date}</p>
          {/* タスクの写真を表示 */}
          <img src={photo_url} alt={task_name} />
        </div>
        {talks.length === 0 && <p>関連するデータがありません</p>}
        {talks.map((item) => (
          <Accordion key={item.task_id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} // アコーディオンの拡張アイコンを設定します。
              aria-controls={`panel${item.task_id}-content`}
              id={`panel${item.task_id}-header`}
            >
              <Typography>{item.talk_id}</Typography>{" "}
              {/* アイテムのタイトルを表示します */}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Task_id:</strong> {item.task_id}
              </Typography>
              <Typography>
                <strong>Talk_id:</strong> {item.talk_id}
              </Typography>
              <Typography>
                <strong>Talk:</strong> {item.talk}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
}

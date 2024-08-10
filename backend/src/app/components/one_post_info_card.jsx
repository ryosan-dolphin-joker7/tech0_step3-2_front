export default function OnePostInfoCard({
  task_id, // タスクのID
  task_name, // タスクの名前
  task_content, // タスクの内容
  date, // タスクの日付
  photo_url, // タスクの写真URL
}) {
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
      </div>
    </>
  );
}

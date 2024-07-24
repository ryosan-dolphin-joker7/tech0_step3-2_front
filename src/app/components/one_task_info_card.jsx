export default function OneTaskInfoCard({
  task_id,
  task_name,
  task_content,
  crated_at,
}) {
  return (
    <>
      <div className="m-4 card bordered bg-blue-100 duration-200 hover:border-r-red">
        <div className="card-body">
          <h2 className="card-title">{task_name}</h2>
          <p>Task ID: {task_id}</p>
          <p>Task name: {task_content}</p>
          <p>Date: {crated_at}</p>
        </div>
      </div>
    </>
  );
}

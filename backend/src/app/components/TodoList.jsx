import { createClient } from "@/utils/supabase/server";

export default async function TodoList() {
  const supabase = createClient();
  const { data: todos } = await supabase.from("todos").select();

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}

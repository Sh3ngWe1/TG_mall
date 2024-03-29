import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function DELETE() {
  const supabase = createClient();

  const { data, error } = await supabase.from("test").delete().match({ id: 1 });

  if (error) {
    return {
      status: 500,
      body: { error: "Error deleting data" },
    };
  }

  return {
    status: 200,
    body: { data },
  };
}

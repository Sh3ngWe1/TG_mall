import { createClient } from "@/utils/supabase/server";

interface params {
  deleteId: string; // 或者是 number，根據您的實際情況
}

export async function DELETE({ params }: { params: params }) {
  const { deleteId } = params;
  const supabase = createClient();

  // 檢查 deleteId 是否存在
  const { data: t, error } = await supabase
    .from("test")
    .select()
    .eq("id", deleteId)
    .single();

  // 如果找不到對應的 id，返回錯誤訊息
  if (error) {
    return new Response(
      JSON.stringify({ code: 404, msg: "Data not found", data: "" }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 如果找到了，執行刪除操作
  const { error: deleteError } = await supabase
    .from("test")
    .delete()
    .match({ id: deleteId });

  // 如果刪除過程中出現錯誤，返回錯誤訊息
  if (deleteError) {
    return new Response(
      JSON.stringify({ code: 500, msg: "Internal Server Error", data: "" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 如果刪除成功，返回成功訊息
  return new Response(
    JSON.stringify({ code: 200, msg: "Data deleted successfully", data: "" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

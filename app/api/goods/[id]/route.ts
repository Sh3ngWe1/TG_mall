import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//先抓status的資料, 在進行判斷
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: statusData, error: statusError } = await supabase
    .from("test")
    .select("status")
    .eq("id", id)
    .single();

  if (statusError) {
    return Response.json({ code: 401, msg: statusError.message, data: {} });
  }
  //return Response.json({ code: 200, msg: "", data: { statusData } });

  //若status===0, 則不允許刪除。
  if (statusData.status === 0) {
    return new Response(
      JSON.stringify({ code: 403, msg: "不允許刪除此筆資料", data: {} }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  //若status===1, 則可以刪除資料
  const { data: deleteData, error: deleteError } = await supabase
    .from("test")
    .update({ status: 0 })
    .eq("id", id)
    .single();

  if (deleteError) {
    return new Response(
      JSON.stringify({ code: 401, msg: deleteError.message, data: {} }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ code: 200, msg: "資料已刪除", data: { deleteData } }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// export async function GET(
//   req: NextRequest,
//   { params: { deleteId } }: { params: { deleteId: string } }
// ) {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from("test")
//     .delete()
//     .eq("id", deleteId)
//     .single();

//   if (error) {
//     return Response.json({ code: 401, msg: error.message, data: "" });
//   }
//   return Response.json({ code: 200, msg: "", data: { data } });
// }

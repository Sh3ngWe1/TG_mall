import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Get a good info with "good_id"
export async function GET() {
  const supabase = createClient();
  const { data: t } = await supabase.from("goods").select().eq("status", 1);
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}

// Update a data with "good_id"
export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const supabase = createClient();
  const name = "Tommy";
  const { data, error } = await supabase
    .from("goods")
    .update({ good_name: name })
    .eq("good_id", id);

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: "" });
  }
  return Response.json({ code: 200, msg: "成功更新", data: { data } });
}

//Delete a data with "good_id"
export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: statusData, error: statusError } = await supabase
    .from("goods")
    .select("status")
    .eq("good_id", id)
    .single();

  if (statusError) {
    return Response.json({ code: 401, msg: statusError.message, data: {} });
  }

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
    .from("goods")
    .update({ status: 0 })
    .eq("good_id", id)
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

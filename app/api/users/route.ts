import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//先抓status的資料, 在進行判斷
//Show出status===1的user資料
export async function GET() {
  const supabase = createClient();
  const { data: statusData, error: statusError } = await supabase
    .from("users")
    .select("status")
    .single();

  if (statusError) {
    return Response.json({ code: 401, msg: statusError.message, data: {} });
  }
  //若status===0, 則不允許刪除。
  if (statusData.status === 1) {
    const { data: deleteData, error: deleteError } = await supabase
      .from("test")
      .update({ status: 0 })
      .single();
  }
}

//create a data
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .insert({
      name: "Tommy",
    })
    .single();

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: {} });
  }
  return Response.json({
    code: 200,
    msg: "Success to create a user.",
    data: {},
  });
}

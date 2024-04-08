import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//先抓status的資料, 在進行判斷
//Show出status===1的user資料
export async function GET() {
  const supabase = createClient();
  const { data: t } = await supabase.from("orders").select().eq("status", 1);
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}

//create a data
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      order_id: "1",
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

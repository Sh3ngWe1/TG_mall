import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//先抓status的資料, 在進行判斷
//Show出status===1的資料
export async function GET() {
  const supabase = createClient();
  const { data: t } = await supabase.from("cart").select().eq("status", 1);
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}

//create a data
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .insert({
      good_id: "1",
      good_name: "哈利波特",
    })
    .single();

  if (error) {
    return Response.json({ code: 401, msg: error.message, data: {} });
  }
  return Response.json({
    code: 200,
    msg: "Create Successfully",
    data: {},
  });
}

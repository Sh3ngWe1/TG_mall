import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
//import { TableName } from "@/src/types";

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'API-Key': process.env.DATA_API_KEY,
  //     },
  // })
  // const data = await res.json()
  const supabase = createClient();
  const { data: t } = await supabase.from("test").select().eq("status", 1);
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST({
  params: { memberName },
}: {
  params: { memberName: string };
}) {
  const supabase = createClient();

  // 新增的資料
  const newData = {
    name: `${memberName}`,
  };

  // 插入新数据
  const { data, error } = await supabase.from("test").insert([newData]);

  if (error) {
    console.error("Error inserting data:", error.message);
    return Response.json({
      code: 500,
      msg: "Error inserting data",
      data: null,
    });
  }

  if (!data) {
    console.error("No data returned after insertion");
    return Response.json({
      code: 500,
      msg: "No data returned after insertion",
      data: null,
    });
  }

  // 返回成功的响应
  return Response.json({
    code: 200,
    msg: "Data inserted successfully",
    data: data,
  });
}
export async function GET() {
  const supabase = createClient();
  const { data: t } = await supabase.from("test").select();
  if (!t) {
    return Response.json({ code: 401, msg: "", data: "" });
  }
  return Response.json({ code: 200, msg: "", data: { data: t } });
}

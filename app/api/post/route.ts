import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = createClient();

  // 新增的資料
  const newData = {
    // 根据你的表结构，设置相应的字段和值
    // 例如，假设你的表中有名为 "name" 和 "age" 的字段
    name: "John",
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

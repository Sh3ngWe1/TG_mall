import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// export async function POST() {
//     const supabase = createClient();
//     const {data:t} = await supabase.from("test").select();
//     if (!t) {
//         return Response.json({code: 401, msg: "",data: ""});
//     }
//     return Response.json({code: 200, msg: "", data: {data:t}});
// }

export async function POST() {
  const supabase = createClient();

  // 新增一筆資料到 "test" 資料表中
  const { data, error } = await supabase
    .from("test")
    .insert([{ id: 2, name: "John" }]);

  if (error) {
    // 如果出現錯誤，回傳錯誤訊息
    return Response.json({
      code: 500,
      msg: "Error adding data to the database",
      data: null,
    });
  } else {
    // 如果成功新增資料，回傳成功訊息和新增的資料
    return Response.json({
      code: 200,
      msg: "Data added successfully",
      data: data,
    });
  }
}

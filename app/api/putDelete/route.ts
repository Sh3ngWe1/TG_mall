import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// export async function DELETE() {
//   const supabase = createClient();

//   // 新增一筆資料到 "test" 資料表中
//   const { data, error } = await supabase
//     .from("test")
//     .insert([{ id: 2, name: "John" }]);

//   if (error) {
//     // 如果出現錯誤，回傳錯誤訊息
//     return Response.json({
//       code: 500,
//       msg: "Error adding data to the database",
//       data: null,
//     });
//   } else {
//     // 如果成功新增資料，回傳成功訊息和新增的資料
//     return Response.json({
//       code: 200,
//       msg: "Data added successfully",
//       data: data,
//     });
//   }
// }

export async function DELETE() {
  const supabase = createClient();

  // 删除 ID 为 2 的数据
  const { data, error } = await supabase.from("test").delete().eq("id", 1);

  if (error) {
    // 如果出现错误，返回错误消息
    return Response.json({
      code: 500,
      msg: "Error deleting data from the database",
      data: null,
    });
  } else {
    // 如果成功删除数据，返回成功消息和删除的数据
    return Response.json({
      code: 200,
      msg: "Data deleted successfully",
      data: data,
    });
  }
}

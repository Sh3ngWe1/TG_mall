import { createClient } from "@/utils/supabase/server";
import { Response } from "express";

export async function DELETE(): Promise<Response> {
  const supabase = createClient();

  try {
    // 在 test 表中删除 id 为 1 的记录
    const { error } = await supabase.from("test").delete().eq("id", 1);
    if (error) {
      // 如果发生错误，则返回错误响应
      return Response.json({
        code: 500,
        msg: "Error deleting data",
        data: null,
      });
    }

    // 成功删除记录，返回成功响应
    return Response.json({
      code: 200,
      msg: "Data deleted successfully",
      data: null,
    });
  } catch (error) {
    // 捕获并处理任何异常
    console.error("Error:", error);
    return Response.json({
      code: 500,
      msg: "Internal server error",
      data: null,
    });
  }
}

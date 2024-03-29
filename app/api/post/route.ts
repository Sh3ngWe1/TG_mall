import { createClient } from "@/utils/supabase/server";

export default async function deleteData(req: any, res: any) {
  if (req.method === "POST") {
    const supabase = createClient();

    // 删除 ID 为 1 的数据
    const { data, error } = await supabase.from("test").delete().eq("id", 1);

    if (error) {
      // 如果出现错误，返回错误消息
      res.status(500).json({
        code: 500,
        msg: "Error deleting data from the database",
        data: null,
      });
    } else {
      // 如果成功删除数据，返回成功消息和删除的数据
      res.status(200).json({
        code: 200,
        msg: "Data deleted successfully",
        data: data,
      });
    }
  } else {
    // 如果收到的不是 POST 请求，返回 405 错误
    res.status(405).end();
  }
}

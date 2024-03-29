import { createClient } from "@/utils/supabase/server";
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const supabase = createClient();

    // 刪除ID為1的資料
    const { data, error } = await supabase.from("test").delete().eq("id", 1);

    if (error) {
      // 如果出現錯誤，回傳錯誤訊息
      res.status(500).json({
        code: 500,
        msg: "Error deleting data from the database",
        data: null,
      });
    } else {
      // 如果成功刪除資料，回傳成功訊息和刪除的資料
      res.status(200).json({
        code: 200,
        msg: "Data deleted successfully",
        data: data,
      });
    }
  } else {
    // 如果收到的是非POST請求，回傳405錯誤
    res.status(405).end();
  }
}

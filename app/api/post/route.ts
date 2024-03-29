// pages/api/yourRoute.js

import { createClient } from "@/utils/supabase/server";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const supabase = createClient();

    // 新增一筆資料到 "test" 資料表中
    const { data, error } = await supabase
      .from("test")
      .insert([{ id: 2, time: "24:00:00", name: "John" }]);

    if (error) {
      // 如果出現錯誤，回傳錯誤訊息
      res
        .status(500)
        .json({
          code: 500,
          msg: "Error adding data to the database",
          data: null,
        });
    } else {
      // 如果成功新增資料，回傳成功訊息和新增的資料
      res
        .status(200)
        .json({ code: 200, msg: "Data added successfully", data: data });
    }
  } else {
    // 如果收到的是非POST請求，回傳405錯誤
    res.status(405).end();
  }
}

import { createClient } from "@/utils/supabase/server";

export async function deleteTestData(
  req: { params: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  }
) {
  try {
    const supabase = createClient();
    const { id } = req.params; // 假设从请求参数中获取要删除的数据的 id

    const { error } = await supabase.from("test").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ message: "Error deleting test data" });
    }

    return res.status(200).json({ message: "Test data deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

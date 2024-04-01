// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// export async function PUT() {
//   const supabase = createClient();

//   const { data: t, error } = await supabase
//     .from("test")
//     .delete()
//     .match({ id: 1 });

//   if (!t) {
//     return Response.json({ code: 401, msg: "", data: "" });
//   }
//   return Response.json({ code: 200, msg: "", data: { data: t } });
// }

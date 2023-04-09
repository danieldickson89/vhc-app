import { supabase } from "../../lib/supabaseClient";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET":
      let data = await supabase.from("players").select();
      res.status(200).json({
        message: "Get Success",
        response: data,
      });
      break;
  }
}

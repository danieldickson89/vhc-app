import { supabase } from "../../lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  response: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      let response = await supabase
        .from("players")
        .select()
        .eq("attending", true);
      res.status(200).json({
        message: "Get Success",
        response: response,
      });
      break;
  }
}

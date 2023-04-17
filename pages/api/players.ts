import sortData from "@/services/sortData";
import { supabase } from "../../lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  response: any;
};

type ApiResponse = {
  response: {
    data: any;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const response = await supabase
        .from("players")
        .select()
        .order("name", { ascending: true });
      res.status(200).json({
        message: "Get Success",
        response: response,
      });
      break;
  }
}

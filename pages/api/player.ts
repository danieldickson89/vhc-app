import { supabase } from "../../lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  response: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const { data, error } = await supabase
          .from("players")
          .select()
          .eq("id", id)
          .limit(1)
          .single();
        res.status(200).json({
          message: "Get Success",
          response: { data, error },
        });
        break;
      } catch (error) {
        res.status(500).json({
          message: "Error getting player",
          response: error,
        });
      }
    case "POST":
      const name = req.body.name;
      const offense = req.body.offense;
      const defense = req.body.defense;
      const skating = req.body.skating;
      const passing = req.body.passing;
      const shot = req.body.shot;
      const stick = req.body.stick;
      const attending = req.body.attending;
      const { error } = await supabase.from("players").insert({
        name: name,
        offense: offense,
        defense: defense,
        skating: skating,
        passing: passing,
        shot: shot,
        stick: stick,
        attending: attending,
      });
      if (error) {
        res.status(500).json({
          message: "Error creating player",
          response: error,
        });
      } else {
        res.status(200).json({
          message: "Post Success",
          response: null,
        });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;

        const { error } = await supabase
          .from("players")
          .update({
            name: req.body.name,
            offense: req.body.offense,
            defense: req.body.defense,
            skating: req.body.skating,
            passing: req.body.passing,
            shot: req.body.shot,
            stick: req.body.stick,
            attending: req.body.attending,
          })
          .eq("id", id);
        if (error) {
          res.status(500).json({
            message: "Error updating player",
            response: error,
          });
        } else {
          res.status(200).json({
            message: "Put Success",
            response: null,
          });
        }
        break;
      } catch (error) {
        res.status(500).json({
          message: "Error updating player",
          response: error,
        });
      }
    case "DELETE":
      try {
        const { id } = req.query;
        const { error } = await supabase.from("players").delete().eq("id", id);
        if (error) {
          res.status(500).json({
            message: "Error deleting player",
            response: error,
          });
        } else {
          res.status(200).json({
            message: "Delete Success",
            response: null,
          });
        }
        break;
      } catch (error) {
        res.status(500).json({
          message: "Error deleting player",
          response: error,
        });
      }
  }
}

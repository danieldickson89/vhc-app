import { supabase } from "../../lib/supabaseClient";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const { data, error } = await supabase
          .from("players")
          .select()
          .eq("id", id);
        res.status(200).json({
          message: "Get Success",
          response: { data, error },
        });
        break;
      } catch (error) {
        res.status(400).json({ success: false });
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
        });
      } else {
        res.status(200).json({
          message: "Post Success",
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
          });
        } else {
          res.status(200).json({
            message: "Put Success",
          });
        }
        break;
      } catch (error) {
        res.status(500).json({
          message: "Error updating player",
          error: error,
        });
      }
    case "DELETE":
      try {
        const { id } = req.query;
        const { error } = await supabase.from("players").delete().eq("id", id);
        if (error) {
          res.status(500).json({
            message: "Error deleting player",
          });
        } else {
          res.status(200).json({
            message: "Delete Success",
          });
        }
        break;
      } catch (error) {
        res.status(500).json({
          message: "Error deleting player",
          error: error,
        });
      }
  }
}

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

import { Database } from "./supabase";

dotenv.config();

const { DATABASE_API_KEY, DATABASE_URL } = process.env;

if (DATABASE_API_KEY && DATABASE_URL) {
  const supabase = createClient<Database>(DATABASE_URL, DATABASE_API_KEY);

  type Table = Database["public"]["Tables"];
  type RefereeInsert = Table["referee"]["Insert"];
  type BenchInsert = Table["bench"]["Insert"];
  type SupportersInsert = Table["supporters"]["Insert"];
  type SoccerTeamInsert = Table["soccer_team"]["Insert"];
  type SoccerPlayerInsert = Table["soccer_player"]["Insert"];
  type SoccerMatchInsert = Table["soccer_match"]["Insert"];
  type LinkDangerLevelBenchInsert = Table["link_dangerlevel_bench"]["Insert"];
  type LinkDangerLevelPlayerInsert =
    Table["link_dangerlevel_soccerplayer"]["Insert"];
  type LinkRefereeSoccerMatchInsert =
    Table["link_referee_soccermatch"]["Insert"];
  type LinkSoccerMatchBenchInsert = Table["link_soccermatch_bench"]["Insert"];
  type LinkSoccerMatchSoccerPlayerInsert =
    Table["link_soccermatch_soccerplayer"]["Insert"];
  type LinkSoccerMatchSupportersInsert =
    Table["link_soccermatch_supporters"]["Insert"];
  type LinkSoccerTeamSoccerCategoryInsert =
    Table["link_soccerteam_soccercategory"]["Insert"];
  type LinkSoccerTeamSoccerMatchInsert =
    Table["link_soccerteam_soccermatch"]["Insert"];
  type LinkSoccerTeamSportSeasonInsert =
    Table["link_soccerteam_sportseason"]["Insert"];
  type Referee = Table["referee"]["Row"];

  const app = express();
  const port = 8005;

  // Middleware
  // Enable CORS
  app.use(cors());
  app.use(bodyParser.json());

  // TEST
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // AUTH
  app.post("/api/signup", async (req: Request, res: Response) => {
    const referee = req.body as RefereeInsert;
    console.log(referee);
    // Check if a user with the same mechanographicCode already exists
    const { data: existingReferee } = await supabase
      .from("referee")
      .select("*")
      .eq("mechanographic_code", referee.mechanographic_code ?? "");

    if (existingReferee && existingReferee.length > 0) {
      return res.status(400).json({
        error: "Referee with the same mechanographic code already exists",
      });
    }
    if (referee.password) {
      referee.password = await bcrypt.hash(referee.password, 10);
      const { data, error } = await supabase
        .from("referee")
        .insert(referee)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ referee: data[0] });
      }
    }
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    const referee = req.body as {
      mechanographic_code: string;
      password: string;
    };
    console.log(referee);
    // Check if a user with the same mechanographicCode already exists
    const { data: existingUser } = await supabase
      .from("referee")
      .select("*")
      .eq("mechanographic_code", referee.mechanographic_code ?? "");
    console.log(existingUser);
    if (existingUser && existingUser.length === 1) {
      const match = await bcrypt.compare(
        referee.password,
        existingUser[0].password!
      );
      if (match) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const token = jwt.sign(
          {
            name: existingUser[0].name,
            mechanographic_code: existingUser[0].mechanographic_code,
            iat: currentTimestamp,
          },
          "jkghtkjgrthkghrtkgjhrekfjerhgfjepourfthourw",
          { expiresIn: "2h" }
        );
        console.log(token);
        return res.status(200).json({ referee: existingUser[0], token: token });
      }
    }
    return res.status(401).json({
      error: "Wrong password or mechanographic code",
    });
  });

  app.post("/api/check-token", async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Token is missing" });
      }

      // Verify the token
      jwt.verify(
        token,
        "jkghtkjgrthkghrtkgjhrekfjerhgfjepourfthourw",
        (err: any, decodedToken: any) => {
          if (err) {
            // Token is invalid or expired
            return res.status(401).json({ error: "Invalid or expired token" });
          }

          // Token is valid
          return res.status(200).json({ valid: true, decodedToken });
        }
      );
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      res.status(500).json({ error: "Error checking token" });
    }
  });

  // REFEREE
  app.post("/api/get-referee", async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Token is missing" });
      }

      // Verify the token
      jwt.verify(
        token,
        "jkghtkjgrthkghrtkgjhrekfjerhgfjepourfthourw",
        async (err: any, decodedToken: any) => {
          if (err) {
            // Token is invalid or expired
            return res.status(401).json({ error: "Invalid or expired token" });
          }
          const mechanographicCode = decodedToken["mechanographic_code"];
          const { data: existingUser } = await supabase
            .from("referee")
            .select("*")
            .eq("mechanographic_code", mechanographicCode ?? "")
            .single();
          // Token is valid
          return res.status(200).json({ existingUser });
        }
      );
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      return res.status(500).json({ error: "Error checking token" });
    }
  });

  // SOCCER CATEGORIES
  app.get("/api/soccer-categories", async (req: Request, res: Response) => {
    try {
      const { data: categories } = await supabase
        .from("soccer_category")
        .select("*");
      return res.status(200).json({ soccerCategories: categories });
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      return res.status(500).json({ error: "Error checking token" });
    }
  });

  app.post(
    "/api/filter-soccer-categories",
    async (req: Request, res: Response) => {
      try {
        const { categoryName, categoryLevel } = req.body as {
          categoryName: string;
          categoryLevel: string;
        };
        let query = supabase.from("soccer_category").select("*");
        if (categoryLevel && categoryLevel.length > 0) {
          query = query.ilike("category_level", `%${categoryLevel}%`);
        }
        if (categoryName && categoryName.length > 0) {
          query = query.ilike("category_name", `%${categoryName}%`);
        }
        const { data: categories } = await query;

        return res.status(200).json({ soccerCategories: categories });
      } catch (error: any) {
        console.error("Error checking token:", error.message);
        return res.status(500).json({ error: "Error checking token" });
      }
    }
  );

  // SPORT SEASONS
  app.get("/api/sport-seasons", async (req: Request, res: Response) => {
    try {
      const { data: seasons } = await supabase.from("sport_season").select("*");
      return res.status(200).json({ sportSeasons: seasons });
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      return res.status(500).json({ error: "Error checking token" });
    }
  });

  app.post("/api/current-season", async (req: Request, res: Response) => {
    try {
      const { today } = req.body as {
        today: Date;
      };
      const dateString = new Date(today).toISOString();
      console.log(today);
      if (today) {
        const { data: season } = await supabase
          .from("sport_season")
          .select("*")
          .lte("start_date", dateString)
          .gte("end_date", dateString)
          .single();

        console.log(season);

        return res.status(200).json({ currentSeason: season });
      }
      res
        .status(500)
        .json({ error: "Please provide a day to get the current season" });
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      return res.status(500).json({ error: "Error checking token" });
    }
  });

  // DANGER LEVEL
  app.get("/api/danger-levels", async (req: Request, res: Response) => {
    try {
      const { data: dangerLevels } = await supabase
        .from("danger_level")
        .select("*");
      return res.status(200).json({ dangerLevels: dangerLevels });
    } catch (error: any) {
      console.error("Error checking token:", error.message);
      return res.status(500).json({ error: "Error checking token" });
    }
  });

  app.get(
    "/api/get-danger-level/:dangerLevelNumber",
    async (req: Request, res: Response) => {
      try {
        const dangerLevelNumber = parseInt(req.params["dangerLevelNumber"]);

        if (dangerLevelNumber) {
          const { data: dangerLevel } = await supabase
            .from("danger_level")
            .select("*")
            .eq("danger_level", dangerLevelNumber)
            .single();

          console.log(dangerLevel);

          return res.status(200).json({ dangerLevel: dangerLevel });
        }
        res
          .status(500)
          .json({ error: "Please provide a day to get the current season" });
      } catch (error: any) {
        console.error("Error checking token:", error.message);
        return res.status(500).json({ error: "Error checking token" });
      }
    }
  );

  // BENCHES
  app.get("/api/benches", async (req: Request, res: Response) => {
    try {
      const { data: benches } = await supabase.from("bench").select("*");
      return res.status(200).json({ benches: benches });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  });

  app.get("/api/benches/:benchId", async (req: Request, res: Response) => {
    const benchId = parseInt(req.params["benchId"]);
    if (benchId) {
      const { data: bench } = await supabase
        .from("bench")
        .select("*")
        .eq("id", benchId);
      if (bench) {
        return res.status(200).json({ bench: bench });
      }
      return res.status(500).json({ message: "Error" });
    }
    return res.status(500).json({ message: "Error" });
  });

  app.post("/api/benches", async (req: Request, res: Response) => {
    const bench = req.body as BenchInsert;
    console.log(bench);
    const { data, error } = await supabase.from("bench").upsert(bench).select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ bench: data[0] });
    }
  });

  app.delete("/api/benches/:benchId", async (req: Request, res: Response) => {
    const benchId = parseInt(req.params["benchId"]);
    console.log(benchId);
    const response = await supabase.from("bench").delete().eq("id", benchId);
    if (response) {
      return res.status(200).json({ id: response });
    }
    return res.status(500).json({ message: "Error" });
  });

  // SUPPORTERS
  app.get("/api/supporters", async (req: Request, res: Response) => {
    try {
      const { data: supporters } = await supabase
        .from("supporters")
        .select("*");
      return res.status(200).json({ supporters: supporters });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  });

  app.get(
    "/api/supporters/:supportersId",
    async (req: Request, res: Response) => {
      const supportersId = parseInt(req.params["supportersId"]);
      if (supportersId) {
        const { data: teamSupporters } = await supabase
          .from("supporters")
          .select("*")
          .eq("id", supportersId);
        if (teamSupporters) {
          return res.status(200).json({ teamSupporters: teamSupporters });
        }
        return res.status(500).json({ message: "Error" });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  app.post("/api/supporters", async (req: Request, res: Response) => {
    const supporters = req.body as SupportersInsert;
    console.log(supporters);
    const { data, error } = await supabase
      .from("supporters")
      .upsert(supporters)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ supporters: data[0] });
    }
  });

  app.delete(
    "/api/supporters/:supportersId",
    async (req: Request, res: Response) => {
      const supportersId = parseInt(req.params["supportersId"]);
      console.log(supportersId);
      const response = await supabase
        .from("supporters")
        .delete()
        .eq("id", supportersId);
      if (response) {
        return res.status(200).json({ id: response });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  // SOCCER TEAM
  app.get("/api/soccer-teams", async (req: Request, res: Response) => {
    try {
      const { data: soccerTeams } = await supabase
        .from("soccer_team")
        .select("*");
      return res.status(200).json({ soccerTeams: soccerTeams });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  });

  app.get(
    "/api/soccer-teams/:soccerTeamId",
    async (req: Request, res: Response) => {
      const soccerTeamId = parseInt(req.params["soccerTeamId"]);
      if (soccerTeamId) {
        const { data: soccerTeam } = await supabase
          .from("soccer_team")
          .select("*")
          .eq("id", soccerTeamId);
        if (soccerTeam) {
          return res.status(200).json({ soccerTeam: soccerTeam });
        }
        return res.status(500).json({ message: "Error" });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  app.post("/api/soccer-teams", async (req: Request, res: Response) => {
    const soccerTeam = req.body as SoccerTeamInsert;
    console.log(soccerTeam);
    const { data, error } = await supabase
      .from("soccer_team")
      .upsert(soccerTeam)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ soccerTeam: data[0] });
    }
  });

  app.delete(
    "/api/soccer-teams/:soccerTeamId",
    async (req: Request, res: Response) => {
      const soccerTeamId = parseInt(req.params["soccerTeamId"]);
      console.log(soccerTeamId);
      const response = await supabase
        .from("soccer_team")
        .delete()
        .eq("id", soccerTeamId);
      if (response) {
        return res.status(200).json({ id: response });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  // SOOCER PLAYER
  app.get("/api/soccer-players", async (req: Request, res: Response) => {
    try {
      const { data: soccerPlayers } = await supabase
        .from("soccer_player")
        .select("*");
      return res.status(200).json({ soccerPlayers: soccerPlayers });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  });

  app.get(
    "/api/soccer-players/:soccerPlayerId",
    async (req: Request, res: Response) => {
      const soccerPlayerId = parseInt(req.params["soccerPlayerId"]);
      if (soccerPlayerId) {
        const { data: soccerPlayer } = await supabase
          .from("soccer_player")
          .select("*")
          .eq("id", soccerPlayerId);
        if (soccerPlayer) {
          return res.status(200).json({ soccerPlayer: soccerPlayer });
        }
        return res.status(500).json({ message: "Error" });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  app.post("/api/soccer-players", async (req: Request, res: Response) => {
    const soccerPlayer = req.body as SoccerPlayerInsert;
    console.log(soccerPlayer);
    const { data, error } = await supabase
      .from("soccer_player")
      .upsert(soccerPlayer)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ soccerPlayer: data[0] });
    }
  });

  app.delete(
    "/api/soccer-players/:soccerPlayerId",
    async (req: Request, res: Response) => {
      const soccerPlayerId = parseInt(req.params["soccerPlayerId"]);
      console.log(soccerPlayerId);
      const response = await supabase
        .from("soccer_player")
        .delete()
        .eq("id", soccerPlayerId);
      if (response) {
        return res.status(200).json({ id: response });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  // SOCCER MATCH
  app.get("/api/soccer-matches", async (req: Request, res: Response) => {
    try {
      const { data: soccerMatches } = await supabase
        .from("soccer_match")
        .select("*");
      return res.status(200).json({ soccerMatches: soccerMatches });
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  });

  app.get(
    "/api/soccer-matches/:soccerMatchId",
    async (req: Request, res: Response) => {
      const soccerMatchId = parseInt(req.params["soccerMatchId"]);
      if (soccerMatchId) {
        const { data: soccerMatch } = await supabase
          .from("soccer_match")
          .select("*")
          .eq("id", soccerMatchId);
        if (soccerMatch) {
          return res.status(200).json({ soccerMatch: soccerMatch });
        }
        return res.status(500).json({ message: "Error" });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  app.post("/api/soccer-matches", async (req: Request, res: Response) => {
    const soccerMatch = req.body as SoccerMatchInsert;
    console.log(soccerMatch);
    const { data, error } = await supabase
      .from("soccer_match")
      .upsert(soccerMatch)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ soccerMatch: data[0] });
    }
  });

  app.delete(
    "/api/soccer-matches/:soccerMatchId",
    async (req: Request, res: Response) => {
      const soccerMatchId = parseInt(req.params["soccerMatchId"]);
      console.log(soccerMatchId);
      const response = await supabase
        .from("soccer_match")
        .delete()
        .eq("id", soccerMatchId);
      if (response) {
        return res.status(200).json({ id: response });
      }
      return res.status(500).json({ message: "Error" });
    }
  );

  // LINKS

  // LINK DANGER-BENCH
  // Add LINK
  app.post("/api/link-danger-bench", async (req: Request, res: Response) => {
    const link = req.body as LinkDangerLevelBenchInsert;
    console.log(link);
    const { data, error } = await supabase
      .from("link_dangerlevel_bench")
      .upsert(link)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ link: data[0] });
    }
  });

  // Get entities given the two ids
  app.get("/api/get-link-danger-bench", async (req: Request, res: Response) => {
    let dangerId: number | string = req.query["dangerId"] as string;
    let benchId: number | string = req.query["benchId"] as string;
    let query = supabase
      .from("link_dangerlevel_bench")
      .select(`*, danger_level:danger_level_id(*), bench:bench_id(*)`);
    if (dangerId && benchId) {
      query = query.eq("bench_id", benchId).eq("danger_level_id", dangerId);
    } else if (dangerId) {
      dangerId = parseInt(dangerId);
      query = query.eq("danger_level_id", dangerId);
    } else if (benchId) {
      benchId = parseInt(benchId);
      query = query.eq("bench_id", benchId);
    } else {
      return res.status(500).json({
        message: "Please provide at least one between benchId or dangerId",
      });
    }
    const { data, error } = await query;
    if (data !== null) {
      return res.status(200).json({ data: data });
    }
    return res.status(404).json({ message: "No bench with this danger level" });
  });

  // LINK DANGER-PLAYER
  // Add LINK
  app.post("/api/link-danger-player", async (req: Request, res: Response) => {
    const link = req.body as LinkDangerLevelPlayerInsert;
    console.log(link);
    const { data, error } = await supabase
      .from("link_dangerlevel_soccerplayer")
      .upsert(link)
      .select();
    console.log(data);
    console.log(error);
    if (data !== null) {
      return res.status(201).json({ link: data[0] });
    }
  });

  // Get entities given the two ids
  app.get(
    "/api/get-link-danger-player",
    async (req: Request, res: Response) => {
      let dangerId: number | string = req.query["dangerId"] as string;
      let playerId: number | string = req.query["playerId"] as string;
      let query = supabase
        .from("link_dangerlevel_soccerplayer")
        .select(
          `*, danger_level:danger_level_id(*), soccer_player:soccer_player_id(*)`
        );
      if (dangerId && playerId) {
        query = query
          .eq("soccer_player_id", playerId)
          .eq("danger_level_id", dangerId);
      } else if (dangerId) {
        dangerId = parseInt(dangerId);
        query = query.eq("danger_level_id", dangerId);
      } else if (playerId) {
        playerId = parseInt(playerId);
        query = query.eq("soccer_player_id", playerId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between playerId or dangerId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res
        .status(404)
        .json({ message: "No player with this danger level" });
    }
  );

  // LINK REFEREE-SOCCER MATCH
  // Add LINK
  app.post(
    "/api/link-referee-soccermatch",
    async (req: Request, res: Response) => {
      const link = req.body as LinkRefereeSoccerMatchInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_referee_soccermatch")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-referee-soccermatch",
    async (req: Request, res: Response) => {
      let refereeId: number | string = req.query["refereeId"] as string;
      let matchId: number | string = req.query["matchId"] as string;
      let query = supabase
        .from("link_referee_soccermatch")
        .select(`*, referee:referee_id(*), soccer_match:soccer_match_id(*)`);
      if (refereeId && matchId) {
        query = query
          .eq("soccer_match_id", matchId)
          .eq("referee_id", refereeId);
      } else if (refereeId) {
        refereeId = parseInt(refereeId);
        query = query.eq("referee_id", refereeId);
      } else if (matchId) {
        matchId = parseInt(matchId);
        query = query.eq("soccer_match_id", matchId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between matchId or refereeId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res
        .status(404)
        .json({ message: "No refereeId has done this matchId" });
    }
  );

  // LINK SOCCER MATCH - BENCH
  // Add LINK
  app.post(
    "/api/link-soccermatch-bench",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerMatchBenchInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccermatch_bench")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccermatch-bench",
    async (req: Request, res: Response) => {
      let matchId: number | string = req.query["matchId"] as string;
      let benchId: number | string = req.query["benchId"] as string;
      let query = supabase
        .from("link_soccermatch_bench")
        .select(`*, soccer_match:soccer_match_id(*), bench:bench_id(*)`);
      if (matchId && benchId) {
        query = query.eq("bench_id", benchId).eq("soccer_match_id", matchId);
      } else if (matchId) {
        matchId = parseInt(matchId);
        query = query.eq("soccer_match_id", matchId);
      } else if (benchId) {
        benchId = parseInt(benchId);
        query = query.eq("bench_id", benchId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between benchId or matchId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res.status(404).json({ message: "No matchId with this benchId" });
    }
  );

  // LINK SOCCER MATCH - SOCCER PLAYER
  // Add LINK
  app.post(
    "/api/link-soccermatch-player",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerMatchSoccerPlayerInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccermatch_soccerplayer")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccermatch-player",
    async (req: Request, res: Response) => {
      let matchId: number | string = req.query["matchId"] as string;
      let playerId: number | string = req.query["playerId"] as string;
      let query = supabase
        .from("link_soccermatch_soccerplayer")
        .select(
          `*, soccer_match:soccer_match_id(*), soccer_player:soccer_player_id(*)`
        );
      if (matchId && playerId) {
        query = query
          .eq("soccer_player_id", playerId)
          .eq("soccer_match_id", matchId);
      } else if (matchId) {
        matchId = parseInt(matchId);
        query = query.eq("soccer_match_id", matchId);
      } else if (playerId) {
        playerId = parseInt(playerId);
        query = query.eq("soccer_player_id", playerId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between playerId or matchId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res.status(404).json({ message: "No matchId with this playerId" });
    }
  );

  // LINK SOCCER MATCH - SUPPORTERS
  // Add LINK
  app.post(
    "/api/link-soccermatch-supporters",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerMatchSupportersInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccermatch_supporters")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccermatch-supporters",
    async (req: Request, res: Response) => {
      let matchId: number | string = req.query["matchId"] as string;
      let supportersId: number | string = req.query["supportersId"] as string;
      let query = supabase
        .from("link_soccermatch_supporters")
        .select(
          `*, soccer_match:soccer_match_id(*), supporters:supporters_id(*)`
        );
      if (matchId && supportersId) {
        query = query
          .eq("supporters_id", supportersId)
          .eq("soccer_match_id", matchId);
      } else if (matchId) {
        matchId = parseInt(matchId);
        query = query.eq("soccer_match_id", matchId);
      } else if (supportersId) {
        supportersId = parseInt(supportersId);
        query = query.eq("supporters_id", supportersId);
      } else {
        return res.status(500).json({
          message:
            "Please provide at least one between supportersId or matchId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res
        .status(404)
        .json({ message: "No matchId with this supportersId" });
    }
  );

  // LINK SOOCER TEAM - SOCCER CATEGORY
  // Add LINK
  app.post(
    "/api/link-soccerteam-soccercategory",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerTeamSoccerCategoryInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccerteam_soccercategory")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccerteam-soccercategory",
    async (req: Request, res: Response) => {
      let teamId: number | string = req.query["teamId"] as string;
      let categoryId: number | string = req.query["categoryId"] as string;
      let query = supabase
        .from("link_soccerteam_soccercategory")
        .select(
          `*, soccer_team:soccer_team_id(*), soccer_category:soccer_category_id(*)`
        );
      if (teamId && categoryId) {
        query = query
          .eq("soccer_category_id", categoryId)
          .eq("soccer_team_id", teamId);
      } else if (teamId) {
        teamId = parseInt(teamId);
        query = query.eq("soccer_team_id", teamId);
      } else if (categoryId) {
        categoryId = parseInt(categoryId);
        query = query.eq("soccer_category_id", categoryId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between categoryId or teamId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res
        .status(404)
        .json({ message: "No teamId with this categoryId" });
    }
  );

  // LINK SOCCER TEAM - SOCCER MATCH
  // Add LINK
  app.post(
    "/api/link-soccerteam-soccermatch",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerTeamSoccerMatchInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccerteam_soccermatch")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccerteam-soccermatch",
    async (req: Request, res: Response) => {
      let teamId: number | string = req.query["teamId"] as string;
      let matchId: number | string = req.query["matchId"] as string;
      let query = supabase
        .from("link_soccerteam_soccermatch")
        .select(
          `*, soccer_team:soccer_team_id(*), soccer_match:soccer_match_id(*)`
        );
      if (teamId && matchId) {
        query = query
          .eq("soccer_match_id", matchId)
          .eq("soccer_team_id", teamId);
      } else if (teamId) {
        teamId = parseInt(teamId);
        query = query.eq("soccer_team_id", teamId);
      } else if (matchId) {
        matchId = parseInt(matchId);
        query = query.eq("soccer_match_id", matchId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between matchId or teamId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res
        .status(404)
        .json({ message: "No teamId with this categoryId" });
    }
  );

  // LINK SOCCER TEAM - SPORT SEASON
  // Add LINK
  app.post(
    "/api/link-soccerteam-sportseason",
    async (req: Request, res: Response) => {
      const link = req.body as LinkSoccerTeamSportSeasonInsert;
      console.log(link);
      const { data, error } = await supabase
        .from("link_soccerteam_sportseason")
        .upsert(link)
        .select();
      console.log(data);
      console.log(error);
      if (data !== null) {
        return res.status(201).json({ link: data[0] });
      }
    }
  );

  // Get entities given the two ids
  app.get(
    "/api/get-link-soccerteam-sportseason",
    async (req: Request, res: Response) => {
      let teamId: number | string = req.query["teamId"] as string;
      let seasonId: number | string = req.query["seasonId"] as string;
      let query = supabase
        .from("link_soccerteam_sportseason")
        .select(
          `*, soccer_team:soccer_team_id(*), sport_season:sport_season_id(*)`
        );
      if (teamId && seasonId) {
        query = query
          .eq("sport_season_id", seasonId)
          .eq("soccer_team_id", teamId);
      } else if (teamId) {
        teamId = parseInt(teamId);
        query = query.eq("soccer_team_id", teamId);
      } else if (seasonId) {
        seasonId = parseInt(seasonId);
        query = query.eq("sport_season_id", seasonId);
      } else {
        return res.status(500).json({
          message: "Please provide at least one between seasonId or teamId",
        });
      }
      const { data, error } = await query;
      if (data !== null) {
        return res.status(200).json({ data: data });
      }
      return res.status(404).json({ message: "No teamId with this seasonId" });
    }
  );

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  console.log("Errore while trying to connect to database");
}

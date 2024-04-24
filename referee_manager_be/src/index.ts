import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Database } from "./supabase";

dotenv.config();

const { DATABASE_API_KEY, DATABASE_URL } = process.env;

if (DATABASE_API_KEY && DATABASE_URL) {
  const supabase = createClient<Database>(DATABASE_URL, DATABASE_API_KEY);

  type Table = Database["public"]["Tables"];
  type RefereeInsert = Table["referee"]["Insert"];
  type Referee = Table["referee"]["Row"];

  const app = express();
  const port = 8001;

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/api/signup", async (req: Request, res: Response) => {
    const referee = req.body as RefereeInsert;
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
      if (data !== null) {
        res.status(201).json({ referee: data[0] });
      }
    }
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    const referee = req.body as {
      mechanographic_code: string;
      password: string;
    };
    // Check if a user with the same mechanographicCode already exists
    const { data: existingUser } = await supabase
      .from("referee")
      .select("*")
      .eq("mechanographic_code", referee.mechanographic_code ?? "");

    if (existingUser && existingUser.length === 1) {
      referee.password = await bcrypt.hash(referee.password, 10);
      if (referee.password === existingUser[0].password) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const token = jwt.sign(
          {
            name: existingUser[0].name,
            mechanographic_code: existingUser[0].mechanographic_code,
            iat: currentTimestamp,
          },
          "jkghtkjgrthkghrtkgjhrekfjerhgfjepourfthourw",
          { expiresIn: "1h" }
        );
        res.status(200).json({ referee: existingUser[0], token });
      }
    }
    return res.status(401).json({
      error: "Wrong password or mechanographic code",
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  console.log("Errore while trying to connect to database");
}

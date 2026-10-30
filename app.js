// app.js — Session 14 starting point (= end state of Lab 4). The Express app, WITHOUT app.listen().
//
// Lab 4 split the old server.js in two so the tests can import the app and
// start it on a random port, while server.js stays the production entry point.
// Session 14, Task C points DATABASE_URL at Supabase WITHOUT changing this file;
// Task D then tunes the Pool below for a cloud database.
const express = require("express");
const { Pool } = require("pg");

const APP_VERSION = "1.3.0"; // change this, merge, and watch the pipeline take it live
const APP_ENV = process.env.APP_ENV ?? "development";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set"); // crash at start

// Creating a Pool does not connect yet: the first query does.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  maxLifetimeSeconds: 300,
  keepAlive: true,
});

// Discard idle clients that encounter a database connection error.
// This prevents an idle connection failure from crashing the process.
pool.on("error", (err) => {
  console.error("Unexpected idle database client error:", err.message);
});

const app = express();

app.get("/", (req, res) => {
  res.json({ app: "notes", status: "running", version: APP_VERSION, env: APP_ENV });
});

// Fast, no login, touches nothing. Render's health check path points here.
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/health/db", async (req, res) => {
  // Proves the database works. Not the platform health check —
  // on Render it reports an error until Session 14 connects Supabase.
  try {
    const r = await pool.query("SELECT count(*) AS n FROM notes");
    res.json({ db: "ok", notes: Number(r.rows[0].n) });
  } catch (err) {
    console.error("health/db failed:", err.message); // detail to the logs, not the browser
    res.status(503).json({ db: "error" });
  }
});

module.exports = { app, pool, APP_VERSION };

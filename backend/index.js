const express = require("express");
require("dotenv").config();
const pool = require("./src/config/db");


const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

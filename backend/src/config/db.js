const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // store your cloud PG link in .env
  ssl: { rejectUnauthorized: false } // some providers like Render/Heroku/Neon require this
});

module.exports = pool;


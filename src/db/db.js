const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.USER_DATABASE,
  host: process.env.HOST,
});

const fetch = async (SQL, params) => {
  const client = await pool.connect();
  console.log("connect db");

  try {
    const { rows } = await client.query(SQL, params);
    return rows;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    client.release();
    console.log("db disconnect...");
  }
};

module.exports.fetch = fetch;

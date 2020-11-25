import pg from "pg";
import config from "../config/config";
import dotenv from "dotenv";

dotenv.config();
let connectionString;
const environmentVariable = process.env.NODE_ENV;

let pool;
if (environmentVariable === "development" || "test") {
  let connectionString = config["development"];
  pool = new pg.Pool({
    ...connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  let connectionString = process.env.DB_URL;
  pool = new Pool({
    connectionString,
    rejectUnauthorized: false,
  });
}

// console.log({...connectionString});
pool.on("connect", () => {});

module.exports = pool;

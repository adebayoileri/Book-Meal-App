import pg from "pg";
import config from "../config/config";
import dotenv from "dotenv";

dotenv.config();
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
  console.log(connectionString);
} else {
  let connectionString =
    "postgres://oaprqywd:QpVzjaDz4UYVfMDJb2wC6G9G30i0g4Lb@suleiman.db.elephantsql.com:5432/oaprqywd";
  pool = new pg.Pool({
    connectionString: connectionString,
    rejectUnauthorized: false,
  });
  console.log(connectionString);
}

// console.log({...connectionString});
pool.on("connect", () => {});

module.exports = pool;

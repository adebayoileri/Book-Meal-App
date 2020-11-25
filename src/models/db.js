import pg from "pg";
import config from "../config/config";
import dotenv from "dotenv";

dotenv.config();
const environmentVariable = process.env.NODE_ENV;
console.log(environmentVariable)
let pool;
if(process.env.NODE_ENV  === "production"){
  console.log("production")
  let connectionString =
    "postgres://oaprqywd:QpVzjaDz4UYVfMDJb2wC6G9G30i0g4Lb@suleiman.db.elephantsql.com:5432/oaprqywd";
  pool = new pg.Pool({
    connectionString,
    rejectUnauthorized: false,
  });
  console.log(connectionString);
}
if (process.env.NODE_ENV === "development" || "test") {
  let connectionString = config["development"];
  pool = new pg.Pool({
    ...connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  console.log(connectionString);
} 

// console.log({...connectionString});
pool.on("connect", () => {});

module.exports = pool;

import { Client, Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
let pool;
if (process.env.NODE_ENV === "development") {
  let connectionString = config["development"];
  pool = new Pool({
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
pool.on("connect", () => {});
export default pool;

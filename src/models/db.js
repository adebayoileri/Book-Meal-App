import pg from "pg";
import config from "../config/config";
import dotenv from "dotenv";

dotenv.config();
let pool;
if(process.env.NODE_ENV === "production"){
  console.log("production")
  let connectionString = "postgres://pdrfhymeltqcgp:533ddddd36628b8510d8051a328b3c3d70c99e00867e093c572f00e70a6e42f5@ec2-34-237-247-76.compute-1.amazonaws.com:5432/dck6hohg77jtpb";
  console.log({...connectionString});
  pool = new pg.Pool({
    connectionString: connectionString,
  });
}
if (process.env.NODE_ENV === "development" || "test") {
  let connectionString = config["development"];
  pool = new pg.Pool({
    ...connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  // console.log(connectionString);
} 

// console.log({...connectionString});
pool.on("connect", () => {});

module.exports = pool;

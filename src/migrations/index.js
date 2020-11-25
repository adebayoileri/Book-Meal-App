import pool from "../models/db";
import migrate from "./migrate";

const migrateDatabase = async () => {
  try {
    await migrate(pool);
    console.log("Database migrated and seeded sucessfully");
    process.exit();
  } catch (error) {
    console.log("An error occured" + error);
  }
};

migrateDatabase();

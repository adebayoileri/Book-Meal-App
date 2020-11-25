import pool from "../models/db";

const DropUsersTable = `DROP TABLE IF EXISTS users`;
const DropMenuTable = `DROP TABLE IF EXISTS menu`;
const DropMealTable = `DROP TABLE IF EXISTS meals`;
const DropOrderTable = `DROP TABLE IF EXISTS orders`;
const DropOrderItemTable = `DROP TABLE IF EXISTS orderitem`;
const DropTransactionTable = `DROP TABLE IF EXISTS transactions`;
const DropRestarauntTable = `DROP TABLE IF EXISTS restaraunts`;

const rollback = async () => {
  try {
    await pool.query(DropRestarauntTable);
    await pool.query(DropOrderItemTable);
    await pool.query(DropTransactionTable);
    await pool.query(DropOrderTable);
    await pool.query(DropMenuTable);
    await pool.query(DropMealTable);
    await pool.query(DropUsersTable);

    console.log("Dropped all tables successfully");
    process.exit();
  } catch (error) {
    console.warn(error);
  }
};

rollback();

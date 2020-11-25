import pool from "../models/db";

/**
 * @class catererController
 * @description handles all operations for the caterer endpoints
 */

class catererController {
  static async getAllOrders(req, res) {
    const { id } = req.user;
    try {
      const getAllCatererOrdersQuery = `SELECT * FROM orderitem WHERE caterer_id=$1`;
      const value = [id];
      const allOrders = await pool.query(getAllCatererOrdersQuery, value);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "get all users orders",
        data: allOrders.rows,
      });
    } catch (error) {}
  }
  static async createRestaraunt(req, res) {
    try {
      const { id } = req.user;
      const { name, description, location, imageUrl } = req.body;
      const checkIfVendorQuery = `SELECT * FROM restaraunts WHERE vendor_id=$1`;
      const val = [id];
      const getRest = await pool.query(checkIfVendorQuery, val);
      if (getRest.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "a caterer can have just one restaurant",
        });
      }
      const createRestarauntQuery = `INSERT INTO restaraunts(name, description, location, vendor_id, imageUrl) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const values = [name, description, location, id, imageUrl];
      const newRestaraunt = await pool.query(createRestarauntQuery, values);
      return res.status(200).json({
        status: "success",
        message: "restaraunt created sucessfullly",
        code: 200,
        data: newRestaraunt.rows[0],
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default catererController;
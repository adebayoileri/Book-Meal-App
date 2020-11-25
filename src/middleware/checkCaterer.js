import pool from "../models/db";

const checkCaterer = async (req, res, next) => {
  try {
    const email = req.user.email;
    const checkCatererQuery = `SELECT * FROM users WHERE email=$1`;
    const value = [email];
    const catererData = await pool.query(checkCatererQuery, value);
    if (catererData.rows[0].role === "caterer") {
      next();
    }else{
      return res.status(401).json({
        status: "failed",
        code: 401,
        message: "unauthorized access",
      });
    }
  } catch (error) {
  }
};

export default checkCaterer;

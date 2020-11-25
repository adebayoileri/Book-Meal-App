import pool from "../models/db";

/**
 * @class userController
 * @description Manages operations for user data
 */
class userController {
  /**
   * @description get profile of a user
   *
   * @param {object} req  user object payload from jwt
   * @param {object} res response object as user data
   */
  static async getProfile(req, res) {
    try {
      const { email, id } = req.user;
      if (!email || !id) {
        return res.status(401).json({
          status: "failed",
          message: "unauthorized accesss",
        });
      }
      const checkUserQuery = `SELECT * FROM users WHERE email=$1 AND id=$2`;
      const values = [email, id];
      const checkUser = await pool.query(checkUserQuery, values);
      if (!checkUser.rows[0]) {
        return res.status(400).json({
          status: "failed",
          message: "user doesn't exist",
        });
      }
      const user = checkUser.rows[0];
      delete user.password;
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "user profile gotten successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Edit User Profile
   *
   * @param {object} req user data and to be updated properties
   * @param {object} res response object with updated user
   */
  static async editProfile(req, res) {
    try {
      const { id } = req.user;
      const { first_name, last_name, email } = req.body;
      const getUserQuery = `SELECT * FROM users WHERE id=$1`;
      const value = [id];
      const getUser = await pool.query(getUserQuery, value);
      const user = getUser.rows[0];
      if (!user) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "user doesn't exist",
        });
      }
      const newFirstName = first_name || user.first_name;
      const newLastName = last_name || user.last_name;
      const newEmail = email || user.email;

      const updateUserQuery = `UPDATE users SET first_name=$1, last_name=$2, email=$3, updatedat=CURRENT_TIMESTAMP WHERE id=$4 RETURNING *`;
      const values = [newFirstName, newLastName, newEmail, id];
      const updatedUser = await pool.query(updateUserQuery, values);
      delete updatedUser.rows[0].password;
      return res.status(200).json({
        status: "sucess",
        code: 200,
        data: updatedUser.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description delete user profile
   *
   * @param {object} req user data
   * @param {object} res response
   */
  static async deleteProfile(req, res) {
    try {
      const { id } = req.user;
      const checkUserQuery = `SELECT * FROM id=$1`;
      const value = [id];
      const getUser = await pool.query(checkUserQuery, value);
      if (getUser.rows[0]) {
        const deleteUserQuery = `DELETE users WHERE id=$1`;
        const value = [id];
        await pool.query(deleteUserQuery, value);
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "deleted user successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default userController;

import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt, { genSalt } from "bcryptjs";
import pool from "../models/db";
import { validateUserLogin, validateUserSignup } from "../validations";

/**
 * @class Authentication
 * @desc User signup, login and auth functions
 */

class Authentication {
  /**
   * @static Signup
   * @description Create Users on app
   *
   * @param {object} request - {email, password} -> The request payload sent to the controller
   * @param {object} response - The response payload sent back from the controller
   *
   * @returns {object}- created user details
   *
   */
  static async signUp(req, res) {
    const { first_name, last_name, email, password, role } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "all fields are required",
      });
    }
    try {
      const signupValidation = validateUserSignup({
        first_name,
        last_name,
        email,
        password,
        role,
      });
      if (signupValidation.error) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: signupValidation.error,
        });
      }
      const checkEmailQuery = `SELECT * FROM users WHERE email=$1`;
      const value = [email];
      const userInfo = await pool.query(checkEmailQuery, value);
      if (userInfo.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "user already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const signUpUserQuery = `INSERT INTO users(first_name, last_name, email, role, password) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const values = [
        first_name,
        last_name,
        email,
        role || "customer",
        hashedPassword,
      ];
      const signedUser = await pool.query(signUpUserQuery, values);

      if (signedUser.rows[0]) {
        jwt.sign(
          {
            email,
            id: signedUser.rows[0].id,
            role: signedUser.rows[0].role,
          },
          process.env.AUTH_KEY,
          { expiresIn: "72h" },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              return res.status(201).json({
                message: "user signed sucessfully",
                code: 201,
                data: signedUser.rows[0],
                token,
              });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Login to a created account
   * @param {object} request - data send to the server
   * @param {object} response - data send to the cient
   *
   * @returns {object}
   */

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "email and password are required",
      });
    }
    try {
      const loginValidation = validateUserLogin({ email, password });
      if (loginValidation.error) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: loginValidation.error,
        });
      }
      const checkEmailQuery = `SELECT * FROM users WHERE email=$1`;
      const value = [email];
      const userInfo = await pool.query(checkEmailQuery, value);
      if (!userInfo.rows[0]) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "invalid email and password",
        });
      }
      const hashedPassword = userInfo.rows[0].password;
      const comparePassword = await bcrypt.compare(password, hashedPassword);
      if (comparePassword) {
        jwt.sign(
          {
            email,
            password: hashedPassword,
            id: userInfo.rows[0].id,
            role: userInfo.rows[0].role,
          },
          process.env.AUTH_KEY,
          { expiresIn: "72h" },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              return res.status(200).json({
                status: "login sucessful",
                code: 200,
                token,
                data: userInfo.rows[0],
              });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default Authentication;
